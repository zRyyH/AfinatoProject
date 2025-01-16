import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Rotas
import authRoutes from './src/routes/auth-routes.js';
import clienteRoutes from './src/routes/cliente-routes.js';
import consultaRoutes from './src/routes/consulta-routes.js';
import healthCheckRoutes from './src/routes/health-check-routes.js';

// Helpers
import { errorResponse } from './src/helpers/default-response.js';

// Banco de Dados
import sequelize from './src/config/database.js';

// Instância Express
const app = express();

const NODE_ENV = 'dev';

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev')); // Logs de requisições
app.use(express.json()); // Processar JSON no corpo das requisições

// Rotas
app.use("/auth", authRoutes);
app.use("/health", healthCheckRoutes);
app.use("/cliente", clienteRoutes);
app.use("/consulta", consultaRoutes);

// Middleware para Rotas Não Encontradas
app.use(async (req, res, next) => {
    errorResponse(res, 'Rota não encontrada!', undefined, 404)
});

// Middleware Global de Erro
app.use(async (err, req, res, next) => {
    errorResponse(res, err.message, err.stack)
});

// Sincronização do Banco de Dados
sequelize.sync({ alter: NODE_ENV !== 'production' }) // Evitar `alter` em produção
    .then(() => console.log('Database sincronizado com sucesso!'))
    .catch(err => console.error('Database erro de sincronização:', err));

// Exportando Instância Configurada
export default app;