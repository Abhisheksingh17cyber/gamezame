import { Gamepad2, Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f5d861, #d4af37, #9a7b2f)' }}
            >
              <Gamepad2 className="w-4 h-4 text-black" />
            </div>
            <span className="font-display text-sm font-bold text-white tracking-wide">GAMEZAME</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[#d4af37] transition-colors">About</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-[#d4af37] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#d4af37] transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#2a2a2a] text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} GameZame. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
