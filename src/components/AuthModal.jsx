import { useState } from "react";

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      alert(`¡Cuenta creada con éxito para ${name}! Ahora puedes iniciar sesión en Zentrum.`);
      setIsRegister(false); 
    } else {
      if (email && password) {
        onLoginSuccess({ name: name || "johao grisales" });
        onClose(); 
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative shadow-2xl border border-slate-100">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
        >
          ✕
        </button>

        {/* Pestañas del Modal */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`w-1/2 pb-3 text-sm font-bold transition-all ${
              !isRegister ? "text-[#0070e0] border-b-2 border-[#007bf3]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`w-1/2 pb-3 text-sm font-bold transition-all ${
              isRegister ? "text-[#0070e0] border-b-2 border-[#007bf3]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Formulario de Entrada */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nombre Completo</label>
              <input
                required
                type="text"
                placeholder="Ej. Johao Grisales"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#007bf3] focus:bg-white transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Correo Electrónico</label>
            <input
              required
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#007bf3] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Contraseña</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#007bf3] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#007bf3] hover:bg-[#0062c4] text-white font-bold py-2.5 rounded-lg text-sm shadow-sm transition-colors mt-2 cursor-pointer"
          >
            {isRegister ? "Registrarse" : "Ingresar a mi Cuenta"}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          Al continuar aceptas los Términos y Condiciones de Zentrum Inmobiliaria.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;