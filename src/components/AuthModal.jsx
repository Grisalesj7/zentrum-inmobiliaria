import React, { useState } from "react";

function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSocialAuth = (provider) => {
    const socialUser = {
      name: name || (provider === "Google" ? "Andres Grisales (Google)" : "Andres G. (Apple)"),
      email: email || `andres.${provider.toLowerCase()}@zentrum.com`,
      avatar: provider === "Google" ? "G" : "",
      role: "admin"
    };
    onLogin(socialUser);
    alert(`⚡ Autenticado con éxito a través de ${provider}`);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalEmail = email.trim() || "Andres123@gmail.com";
    const finalName = isLogin ? "Andres" : (name.trim() || "Nuevo Asesor");

    const demoUser = {
      name: finalName,
      email: finalEmail,
      avatar: finalName.substring(0, 2).toUpperCase(),
      role: "admin"
    };

    onLogin(demoUser);
    alert(isLogin ? "🎉 ¡Sesión iniciada como Asesor!" : "🚀 ¡Cuenta creada con éxito!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#001533]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-[#002f6c] tracking-tight">
              {isLogin ? "Acceso a la Red Zentrum" : "Crea tu Cuenta en Zentrum"}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              {isLogin ? "Ingresa a tu ecosistema inmobiliario privado." : "Regístrate para empezar a indexar inmuebles."}
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-7 h-7 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 font-bold rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-slate-100 bg-slate-50/50 p-1 m-4 rounded-xl">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${isLogin ? "bg-white text-[#0070e0] shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
          >
            Iniciar Sesión
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${!isLogin ? "bg-white text-[#0070e0] shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
          >
            Registrarme
          </button>
        </div>

        <div className="p-6 pt-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => handleSocialAuth("Google")}
              className="flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              🌐 Google
            </button>
            <button 
              type="button"
              onClick={() => handleSocialAuth("Apple")}
              className="flex items-center justify-center gap-2 bg-black hover:bg-slate-900 text-white p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
               Apple ID
            </button>
          </div>

          <div className="flex items-center my-3 text-[9px] font-black text-slate-400 uppercase tracking-widest before:content-[''] before:flex-1 before:border-b before:mr-3 after:content-[''] after:flex-1 after:border-b after:ml-3">
            O con tus datos
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Andres Grisales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-[#0070e0] font-medium"
                />
              </div>
            )}

            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                placeholder="Andres123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-[#0070e0] font-medium"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-[#0070e0] font-medium"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0070e0] hover:bg-[#005bb8] text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-xs mt-2"
            >
              {isLogin ? "🔐 Entrar como Asesor" : "✉️ Crear Cuenta Gratuita"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AuthModal;