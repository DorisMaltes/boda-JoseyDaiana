//esta es un codigo nuevo que funciona como una capa de protección, cada vez que el dashboard sea requirido, la petición ira por esta funcion primero , lee la Authorization: Beare <toekn> header y le pregunta a Supabase "is this a valid logged-user?", si sí la petición continua, si no para por completo y manda un 401 de no autorizado
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  //lee el Autorization: Bearer del header
  const authHeader = req.headers['authorization'];

  //del header solo agarra el Bearer prefix para obtener el raw token
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  //le manda ese token a supabase.auth.getUser(token), y supabase verifica la firma y checa si la sesión aun esta activa
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  
  //si supabase valida, next() es llamado  y la peticion llega al controlador 
  next();
}
