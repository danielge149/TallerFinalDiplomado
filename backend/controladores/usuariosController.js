// Importa el modelo de usuario desde usuariosModelo.js
import { usuario } from "../modelos/usuariosModelo.js";
// Función para autenticar a un usuario
const autenticarUsuario = async (req, res) => {
  // Extrae nombre y contraseña del cuerpo de la solicitud
  const { nombre, contrasena } = req.body;
  try {
    // Busca al usuario en la base de datos por su nombre
    const usuarioEncontrado = await usuario.findOne({
      where: { nombre: nombre },
    });
    if (usuarioEncontrado) {
      // Compara la contraseña directamente (sin bcrypt)
      if (contrasena === usuarioEncontrado.contrasena) {
        // Usuario autenticado correctamente
        res.status(200).json({
          autenticado: true,
          tipo: "success",mensaje: 'Inicio de sesión exitoso',
        });
      } else {
        // Contraseña incorrecta
        res.status(401).json({
          autenticado: false,
          tipo: "success",mensaje: 'Nombre de usuario o contraseña incorrectos',
        });
      }
    } else {
      // Usuario no encontrado
      res.status(404).json({
        autenticado: false,
        tipo: "success",mensaje: 'Nombre de usuario o contraseña incorrectos',
      });
    }
  } catch (error) {
    // Manejo de errores internos del servidor
    console.error('Error al intentar autenticar usuario', error);
    res.status(500).json({
      tipo: 'error',mensaje: 'Error interno del servidor',
    });
  }
};
// Exporta la función para poder utilizarla en otros archivos
export { autenticarUsuario };
