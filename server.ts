import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import {
  createBookingInDb,
  getBookingsByUserUid,
  getBookingByReference,
  updateBookingStatusInDb,
} from './src/db/bookings.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'HAK fix Core API', timestamp: new Date().toISOString() });
  });

  // User Auth Sync (Registers or updates Firebase user in PostgreSQL database)
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const userUid = req.user!.uid;
      const email = req.user!.email || `${userUid}@hakfix.local`;
      const name = req.body.name || req.user!.name || email.split('@')[0];
      const role = req.body.role || 'customer';
      const phone = req.body.phone;
      const avatarUrl = req.user!.picture || req.body.avatarUrl;

      const userRecord = await getOrCreateUser({
        uid: userUid,
        email,
        name,
        role,
        phone,
        avatarUrl,
      });

      res.json({ success: true, user: userRecord });
    } catch (error: any) {
      console.error('Error in /api/auth/sync:', error);
      res.status(500).json({ error: 'Failed to sync user profile' });
    }
  });

  // Get current user profile and bookings
  app.get('/api/user/profile', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const userUid = req.user!.uid;
      const userRecord = await getUserByUid(userUid);
      const userBookings = await getBookingsByUserUid(userUid);

      res.json({
        user: userRecord,
        bookings: userBookings,
      });
    } catch (error: any) {
      console.error('Error in /api/user/profile:', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  });

  // Get user bookings
  app.get('/api/bookings', optionalAuth, async (req: AuthRequest, res: Response) => {
    try {
      const userUid = req.user?.uid;
      if (!userUid) {
        return res.json({ bookings: [] });
      }
      const userBookings = await getBookingsByUserUid(userUid);
      res.json({ bookings: userBookings });
    } catch (error: any) {
      console.error('Error in /api/bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // Create new booking with Anti-Surprise Price Lock
  app.post('/api/bookings', optionalAuth, async (req: AuthRequest, res: Response) => {
    try {
      const userUid = req.user?.uid || req.body.userUid || null;
      const b = req.body;

      if (!b.customerName || !b.customerPhone || !b.serviceName) {
        return res.status(400).json({ error: 'Missing required booking fields' });
      }

      const reference =
        b.bookingReference ||
        `HAK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

      const newBooking = await createBookingInDb({
        bookingReference: reference,
        userUid,
        customerName: b.customerName,
        customerEmail: b.customerEmail || (req.user?.email ?? 'guest@hakfix.com'),
        customerPhone: b.customerPhone,
        customerAddress: b.customerAddress || 'Address on file',
        serviceCategory: b.serviceCategory || 'general',
        serviceName: b.serviceName,
        providerId: b.providerId,
        providerName: b.providerName,
        scheduledDate: b.scheduledDate || new Date().toISOString().split('T')[0],
        scheduledTime: b.scheduledTime || '10:00 AM - 12:00 PM',
        status: 'accepted',
        basePrice: parseInt(b.basePrice, 10) || 499,
        emergencyFee: parseInt(b.emergencyFee, 10) || 0,
        taxAmount: parseInt(b.taxAmount, 10) || 0,
        totalPrice: parseInt(b.totalPrice, 10) || 499,
        notes: b.notes || 'HAK FairFix™ Guaranteed Price Lock',
      });

      res.status(201).json({ success: true, booking: newBooking });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  // Update booking status
  app.patch('/api/bookings/:reference/status', async (req: Request, res: Response) => {
    try {
      const { reference } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const updated = await updateBookingStatusInDb(reference, status);
      if (!updated) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json({ success: true, booking: updated });
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ error: 'Failed to update booking status' });
    }
  });

  // HAK FairFix™ Diagnostic Engine (Unique MVP Feature vs UrbanClap)
  app.post('/api/fairfix/diagnose', (req: Request, res: Response) => {
    try {
      const { description, category, hasImage } = req.body;
      const text = (description || '').toLowerCase();

      // Transparent parts database with retail price lock
      interface DiagnosticResult {
        issueTitle: string;
        severity: 'routine' | 'urgent' | 'emergency';
        confidence: number;
        category: string;
        diagnosisSummary: string;
        requiredParts: Array<{ name: string; brand: string; mrp: number; lockedPrice: number }>;
        laborCharge: number;
        estimatedDurationMins: number;
        antiSurpriseGuarantee: string;
        vanPreStocked: boolean;
      }

      let result: DiagnosticResult;

      if (text.includes('ac') || text.includes('cool') || text.includes('water') && text.includes('indoor') || category === 'ac_repair') {
        result = {
          issueTitle: 'Dual-Run Capacitor & Coil Sensor Thermal Dropout',
          severity: 'urgent',
          confidence: 96,
          category: 'ac_repair',
          diagnosisSummary: 'Compressor fan attempts ignition but thermal protector drops out within 15 seconds. High probability of degraded start capacitor or clogged condenser fins.',
          requiredParts: [
            { name: 'OEM 45/5 MFD Dual-Run Capacitor', brand: 'Epcos / Panasonic OEM', mrp: 650, lockedPrice: 480 },
            { name: 'High-Pressure Hydro Coil Clean Kit', brand: 'HAK PureAir Tech', mrp: 350, lockedPrice: 220 },
          ],
          laborCharge: 499,
          estimatedDurationMins: 45,
          antiSurpriseGuarantee: '100% Price Lock: You pay exactly ₹1,199. If tech requires extra parts, HAK pays the difference.',
          vanPreStocked: true,
        };
      } else if (text.includes('leak') || text.includes('pipe') || text.includes('sink') || text.includes('tap') || category === 'plumbing') {
        result = {
          issueTitle: 'Elastomeric Ceramic Cartridge & S-Trap Seal Failure',
          severity: 'routine',
          confidence: 94,
          category: 'plumbing',
          diagnosisSummary: 'Continuous micro-dripping under pressure indicates worn internal cartridge seating. S-trap connector shows rubber gasket calcification.',
          requiredParts: [
            { name: 'Brass 35mm Ceramic Disc Cartridge', brand: 'Jaquar / Kohler Spec', mrp: 520, lockedPrice: 380 },
            { name: 'Reinforced EPDM O-Ring & Teflon Set', brand: 'HAK Industrial Seal', mrp: 180, lockedPrice: 90 },
          ],
          laborCharge: 399,
          estimatedDurationMins: 35,
          antiSurpriseGuarantee: '100% Price Lock: You pay exactly ₹869. No unexpected pipe-replacement upsells.',
          vanPreStocked: true,
        };
      } else if (text.includes('spark') || text.includes('trip') || text.includes('switch') || text.includes('mcb') || category === 'electrical') {
        result = {
          issueTitle: 'B-Curve Miniature Circuit Breaker (MCB) Contact Arc Degrade',
          severity: 'emergency',
          confidence: 97,
          category: 'electrical',
          diagnosisSummary: 'Thermal magnetic trip mechanism is firing due to resistance buildup or loose neutral busbar termination, causing nuisance tripping under load.',
          requiredParts: [
            { name: '32 Amp Double Pole C-Curve MCB 10kA', brand: 'Schneider Electric / Legrand', mrp: 680, lockedPrice: 490 },
            { name: 'Heat-Resistant Copper Busbar Terminal Lug', brand: 'HAK SafetyCore', mrp: 150, lockedPrice: 80 },
          ],
          laborCharge: 449,
          estimatedDurationMins: 30,
          antiSurpriseGuarantee: '100% Price Lock: You pay exactly ₹1,019. Zero surprise electrical bills.',
          vanPreStocked: true,
        };
      } else {
        result = {
          issueTitle: 'Comprehensive Hardware Diagnostic & Multi-Point Inspection',
          severity: 'routine',
          confidence: 91,
          category: category || 'general',
          diagnosisSummary: 'Detailed physical examination with digital multimeter / pressure gauge. Technician will confirm exact component health before touching tools.',
          requiredParts: [
            { name: 'Standard Maintenance & Calibration Pack', brand: 'Verified OEM Specs', mrp: 300, lockedPrice: 190 },
          ],
          laborCharge: 399,
          estimatedDurationMins: 40,
          antiSurpriseGuarantee: '100% Price Lock: Max total ₹589 unless you explicitly authorize secondary repairs in-app.',
          vanPreStocked: true,
        };
      }

      res.json({ success: true, diagnosis: result });
    } catch (error: any) {
      console.error('Error diagnosing:', error);
      res.status(500).json({ error: 'Diagnosis failed' });
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HAK fix server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
