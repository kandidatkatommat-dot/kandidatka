import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana súkromia — Volíme FEI 2026',
}

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen px-4 py-24"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #04101f 100%)' }}
    >
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-xs text-blue-400/50 hover:text-blue-300 transition-colors mb-8 inline-block"
        >
          ← Späť
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
          Ochrana súkromia
        </h1>
        <p className="text-blue-400/40 text-sm mb-10">Platné od: apríl 2026</p>

        <div className="space-y-8 text-blue-100/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-white mb-2">Prevádzkovateľ</h2>
            <p>
              Táto stránka je súčasťou kandidátskej kampane Tomáša Muchu a Martina Bučeka
              pre voľby do Akademického senátu FEI VŠB-TUO (máj 2026). Kontakt:{' '}
              <a href="mailto:tomas.mucha.st@vsb.cz" className="text-blue-400 hover:text-blue-300 transition-colors">
                tomas.mucha.st@vsb.cz
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">IP adresy a ochrana pred spamom</h2>
            <p>
              Pri odosielaní podnetov a hlasovania v prieskume používame hashovanie IP adries
              (jednosmerná transformácia) výhradne na zamedzenie zneužitia. Pôvodná IP adresa
              nie je ukladaná v čitateľnej podobe. Hash sa uchováva len po dobu nevyhnutnú
              pre fungovanie ochrany a nie je zdieľaný s tretími stranami.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">Newsletter</h2>
            <p>
              Ak sa prihlásiš na odber noviniek, ukladáme výhradne tvoju e-mailovú adresu.
              Tá je použitá len na zasielanie informácií o kampani Volíme FEI 2026 a nie je
              poskytovaná žiadnym tretím stranám. Odber môžeš kedykoľvek zrušiť odpoveďou
              na akýkoľvek e-mail z kampane.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">Podnety</h2>
            <p>
              Podnety odoslané cez formulár sú uchovávané v databáze a po schválení moderátorom
              zverejnené na stránke. Meno je nepovinné — ak ho nevyplníš, podnet bude publikovaný
              anonymne. Obsah podnetov nie je zdieľaný s tretími stranami.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">Cookies a sledovanie</h2>
            <p>
              Stránka nepoužíva analytické ani reklamné cookies. Jediné lokálne uložené dáta
              sú technické (napr. informácia o odoslaní hlasovacieho lístku v prieskume),
              uložené v <code className="text-blue-300">localStorage</code> vášho prehliadača.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">Kontakt</h2>
            <p>
              V prípade otázok ohľadom spracovania osobných údajov nás kontaktuj na{' '}
              <a href="mailto:tomas.mucha.st@vsb.cz" className="text-blue-400 hover:text-blue-300 transition-colors">
                tomas.mucha.st@vsb.cz
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
