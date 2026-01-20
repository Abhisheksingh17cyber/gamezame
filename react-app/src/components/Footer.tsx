import { Gamepad2, Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-blue/10 bg-linear-to-b from-black to-black-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo with professional design */}
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border border-blue/30"
              style={{ background: 'linear-gradient(135deg, #4169e1, #0047ab)' }}
            >
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-black bg-linear-to-r from-white via-blue-light to-white bg-clip-text text-transparent tracking-tight">GAMEZAME</span>
              <p className="text-[10px] text-blue/60 uppercase tracking-[0.2em] font-semibold">Premium Gaming</p>
            </div>
          </div>

          {/* Links with royal blue hover */}
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue transition-colors font-medium">About</a>
            <a href="#" className="text-gray-400 hover:text-blue transition-colors font-medium">Terms</a>
            <a href="#" className="text-gray-400 hover:text-blue transition-colors font-medium">Privacy</a>
          </div>

          {/* Social with professional icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-3 text-gray-400 hover:text-blue hover:bg-blue/10 rounded-xl transition-all border border-transparent hover:border-blue/30">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 text-gray-400 hover:text-blue hover:bg-blue/10 rounded-xl transition-all border border-transparent hover:border-blue/30">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue/10 text-center">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} <span className="text-blue">GameZame</span>. All rights reserved. Powered by premium gaming technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
