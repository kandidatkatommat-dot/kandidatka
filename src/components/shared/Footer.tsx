'use client'
import { Separator } from '@/components/ui/separator'
import { Mail } from '@/components/shared/Icons'

export default function Footer() {
  return (
    <footer style={{ background: '#010609' }} className="border-t border-blue-500/8 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div className="space-y-3 max-w-xs">
            <div>
              <span className="text-xl font-black gradient-text">Volíme FEI 2026</span>
            </div>
            <p className="text-sm text-blue-200/40 leading-relaxed">
              Kandidátska stránka pre voľby do Akademického senátu FEI VŠB-TUO na funkčné
              obdobie 2026–2029.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">Termíny</h4>
              <ul className="space-y-2 text-blue-200/45">
                <li>Nominácie: 7.–21. 4. 2026</li>
                <li>Hlasovanie: 12.–15. 5. 2026</li>
                <li>Funkčné obdobie: 2026–2029</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">Kandidáti</h4>
              <ul className="space-y-2 text-blue-200/45">
                <li>Tomáš Mucha</li>
                <li className="font-mono text-blue-400/60 text-xs">MUC0075</li>
                <li className="mt-2">Martin Buček</li>
                <li className="font-mono text-blue-400/60 text-xs">BUC0130</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">Sekcie</h4>
              <ul className="space-y-2">
                {['#o-nas', '#program', '#podnety', '#socialne-siete'].map((href, i) => (
                  <li key={href}>
                    <a href={href} className="text-blue-200/40 hover:text-blue-300 transition-colors">
                      {['O nás', 'Program', 'Podnety', 'Sociálne siete'][i]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">Kontakt</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:tomas.mucha.st@vsb.cz" className="text-blue-200/40 hover:text-blue-300 transition-colors break-all">
                    tomas.mucha.st@vsb.cz
                  </a>
                </li>
                <li>
                  <a href="mailto:martin.bucek.st@vsb.cz" className="text-blue-200/40 hover:text-blue-300 transition-colors break-all">
                    martin.bucek.st@vsb.cz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-blue-500/8 mb-6" />

        {/* Newsletter mini */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 p-4 rounded-2xl" style={{background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)'}}>
          <span className="text-sm text-blue-200/60 whitespace-nowrap flex items-center gap-1.5">
            <Mail size={14} className="text-blue-400/60" />
            Dostávaj aktualizácie:
          </span>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="tvoj@email.com" className="flex-1 sm:w-56 px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-blue-500/20 text-white placeholder:text-blue-300/30 focus:outline-none focus:border-blue-500/50" />
            <button type="submit" className="px-4 py-1.5 text-sm bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white rounded-lg transition-all font-medium">Prihlásiť</button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-200/25">
          <span>© 2026 Tomáš Mucha & Martin Buček · FEI VŠB-TUO, Ostrava</span>
          <span>Akademický senát FEI · voľby 2026–2029</span>
        </div>
      </div>
    </footer>
  )
}
