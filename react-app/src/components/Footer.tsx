import { motion } from 'framer-motion'
import { Gamepad2, Crown, Mail, Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    games: ['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter'],
    support: ['FAQ', 'Contact', 'Terms', 'Privacy', 'About'],
  }

  return (
    <footer className="relative pt-20 pb-8 px-6 bg-gradient-to-b from-transparent to-black">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-black" />
              </div>
              <div>
                <h3 
                  className="text-2xl font-bold tracking-[0.15em] text-gradient-gold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  GAMEZAME
                </h3>
                <p className="text-xs text-gold/50 tracking-[0.2em] uppercase">Premium Gaming</p>
              </div>
            </motion.div>
            
            <p className="text-white/50 mb-6 max-w-sm leading-relaxed">
              Your premier destination for the finest PC games. 
              Experience excellence in gaming with our curated collection.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-gold/20 text-gold/50 hover:text-gold hover:border-gold/50 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-sm font-semibold text-gold tracking-[0.15em] uppercase mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Categories
            </h4>
            <ul className="space-y-3">
              {links.games.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-white/50 hover:text-gold transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 
              className="text-sm font-semibold text-gold tracking-[0.15em] uppercase mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-white/50 hover:text-gold transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-y border-gold/10 mb-8"
        >
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-gold" />
            <span 
              className="text-sm text-gold/70 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Subscribe for exclusive updates
            </span>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
              <input
                type="email"
                placeholder="Enter your email"
                className="input-premium pl-11 w-full py-2.5"
              />
            </div>
            <button className="btn-gold py-2.5 px-6">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-white/30">
            © {currentYear} GameZame. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-xs text-gold/40">
            <Crown className="w-3 h-3" />
            <span style={{ fontFamily: "'Cinzel', serif" }}>Premium Gaming Experience</span>
            <Crown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </footer>
  )
}
