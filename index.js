import express from 'express';
import cors from 'cors';

import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken:
    'TEST-6153427355217638-080814-0ed791ba709a83e87d9049bac7918d5c-1936056521',
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SOY DEL SERVIDOR');
});

app.get('/prueba', (req, res) => {
  res.send('SOY DE PRUEBA');
});

app.post('/create_preference', async (req, res) => {
  console.log(req);

  try {
    const body = {
      items: [
        {
          title: req.body.title,
          // quantity: 1,
          quantity: Number(req.body.quantity),
          // unit_price: 100,
          unit_price: Number(req.body.price),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success:
          'https://task-interview-react-erick-bxiq-9xtcux8qq.vercel.app/',
        failure:
          'https://task-interview-react-erick-bxiq-9xtcux8qq.vercel.app/',
        pending:
          'https://task-interview-react-erick-bxiq-9xtcux8qq.vercel.app/',
      },
      auto_return: 'approved',
    };

    const prefrence = new Preference(client);
    const result = await prefrence.create({ body });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creando la preferencia' });
  }
});

app.listen(port, () => {
  console.log('El servidor activo');
});
