require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 7000;
const secretKey = process.env.JWT_SECRET || 'wanderlust_secret_fallback';

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("demo").collection("users");
    const bookingsCollection = client.db("demo").collection("bookings");
    const paymentsCollection = client.db("demo").collection("payments");
    const destinationsCollection = client.db("demo").collection("destinations");

    // ── Seed Default Destinations (run once) ──
    const seedDestinations = async () => {
      const count = await destinationsCollection.countDocuments();
      if (count === 0) {
        const destinations = [
          { name:'Kyoto', country:'Japan', category:'Cultural', rating:4.9, season:'Spring & Autumn', visa:'Visa-free (90 days)', weather:'18°C', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', tags:['Temples','Gardens','Culture','Cherry Blossoms'] },
          { name:'Amalfi Coast', country:'Italy', category:'Beach & Coastal', rating:4.8, season:'May – September', visa:'Schengen required', weather:'27°C', image:'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80', tags:['Beach','Scenic','Food','Coastal'] },
          { name:'Swiss Alps', country:'Switzerland', category:'Adventure', rating:4.9, season:'December – April', visa:'Schengen required', weather:'-2°C', image:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', tags:['Skiing','Hiking','Mountains','Snow'] },
          { name:'Bali', country:'Indonesia', category:'Beach & Coastal', rating:4.6, season:'April – October', visa:'Visa on arrival (30 days)', weather:'30°C', image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', tags:['Surf','Temples','Wellness','Rice Terraces'] },
          { name:'Paris', country:'France', category:'Cultural', rating:4.7, season:'April – October', visa:'Schengen required', weather:'20°C', image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', tags:['Art','Food','Romance','Eiffel Tower'] },
          { name:'Santorini', country:'Greece', category:'Beach & Coastal', rating:4.8, season:'June – September', visa:'Schengen required', weather:'28°C', image:'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', tags:['Sunsets','Beaches','Cruises','Romantic'] },
          { name:'Maldives', country:'Maldives', category:'Beach & Coastal', rating:4.9, season:'November – April', visa:'Visa on arrival (30 days)', weather:'30°C', image:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80', tags:['Diving','Overwater Bungalows','Snorkeling','Luxury'] },
          { name:'Tokyo', country:'Japan', category:'Cultural', rating:4.8, season:'March – May, Oct', visa:'Visa-free (90 days)', weather:'22°C', image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', tags:['City','Anime','Food','Shrines'] },
          { name:'Dubai', country:'UAE', category:'Cultural', rating:4.6, season:'November – March', visa:'Visa on arrival (30 days)', weather:'40°C', image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', tags:['Luxury','Desert','Shopping','Burj Khalifa'] },
          { name:'Barcelona', country:'Spain', category:'Cultural', rating:4.7, season:'May – October', visa:'Schengen required', weather:'26°C', image:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80', tags:['Architecture','Beach','Nightlife','Gaudí'] }
        ];
        await destinationsCollection.insertMany(destinations);
        console.log('Seeded default destinations');
      }
    };
    await seedDestinations();

    // ── Auth Routes ──

    app.post('/register', async (req, res) => {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ message: "Username and password are required" });
        }
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ username, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
        console.log("User registered:", username);
      } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
      }
    });

    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: "User not found. Please register." });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
        console.log("User logged in:", username);
      } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
      }
    });

    app.post('/verifyToken', (req, res) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
        }
        res.json({ valid: true, username: decoded.username });
      });
    });

    // ── Bookings Routes ──

    // Get all bookings for a user
    app.get('/bookings/:username', async (req, res) => {
      try {
        const { username } = req.params;
        const bookings = await bookingsCollection.find({ username }).toArray();
        res.json(bookings);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
      }
    });

    // Create a new booking
    app.post('/bookings', async (req, res) => {
      try {
        const { username, bookings } = req.body;
        if (!username || !bookings) {
          return res.status(400).json({ message: 'Username and bookings are required' });
        }
        const result = await bookingsCollection.insertOne({
          username,
          bookings,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        res.status(201).json({ message: 'Bookings saved', id: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: 'Error saving bookings', error });
      }
    });

    // Update bookings for a user
    app.put('/bookings/:username', async (req, res) => {
      try {
        const { username } = req.params;
        const { bookings } = req.body;
        const result = await bookingsCollection.updateOne(
          { username },
          { $set: { bookings, updatedAt: new Date() } },
          { upsert: true }
        );
        res.json({ message: 'Bookings updated', result });
      } catch (error) {
        res.status(500).json({ message: 'Error updating bookings', error });
      }
    });

    // ── Destinations Routes ──

    // Get all destinations
    app.get('/destinations', async (req, res) => {
      try {
        const destinations = await destinationsCollection.find({}).toArray();
        res.json(destinations);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error });
      }
    });

    // ── Payment Routes ──

    // Create a payment intent
    app.post('/payments/create-intent', async (req, res) => {
      try {
        const { username, amount, bookingIds, bookingDetails } = req.body;
        if (!username || !amount) {
          return res.status(400).json({ message: 'Username and amount are required' });
        }
        
        // In production, integrate with Stripe/PayPal here
        const paymentIntent = {
          id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount,
          currency: 'usd',
          status: 'pending',
          username,
          bookingIds: bookingIds || [],
          bookingDetails: bookingDetails || [],
          createdAt: new Date()
        };

        const result = await paymentsCollection.insertOne(paymentIntent);
        res.status(201).json({ 
          clientSecret: `secret_${result.insertedId}`,
          paymentIntentId: paymentIntent.id 
        });
      } catch (error) {
        res.status(500).json({ message: 'Error creating payment intent', error });
      }
    });

    // Confirm payment
    app.post('/payments/confirm', async (req, res) => {
      try {
        const { paymentIntentId, paymentMethod } = req.body;
        if (!paymentIntentId) {
          return res.status(400).json({ message: 'Payment intent ID is required' });
        }

        // Update payment status
        const result = await paymentsCollection.updateOne(
          { id: paymentIntentId },
          { 
            $set: { 
              status: 'succeeded',
              paymentMethod: paymentMethod || 'card',
              confirmedAt: new Date() 
            } 
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Payment intent not found' });
        }

        res.json({ message: 'Payment confirmed', status: 'succeeded' });
      } catch (error) {
        res.status(500).json({ message: 'Error confirming payment', error });
      }
    });

    // Get payment history for user
    app.get('/payments/:username', async (req, res) => {
      try {
        const { username } = req.params;
        const payments = await paymentsCollection.find({ username }).sort({ createdAt: -1 }).toArray();
        res.json(payments);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
