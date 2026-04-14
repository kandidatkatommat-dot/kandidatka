'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AnimatedSection from '@/components/shared/AnimatedSection'

const faqs = [
  {
    q: 'Čo vlastne môže senátor reálne ovplyvniť?',
    a: 'Akademický senát FEI má zákonom definované právomoci: schvaľuje rozpočet fakulty, volí dekana, schvaľuje vnútorné predpisy (vrátane skúšobného poriadku), rozhoduje o otváraní a rušení študijných programov a kontroluje dodržiavanie akademickej slobody. Nie je to len ceremonielná funkcia — sú to reálne rozhodovacie právomoci.',
  },
  {
    q: 'Ako prebieha hlasovanie vo voľbách?',
    a: 'Hlasovanie prebieha elektronicky cez systém UNIS VŠB-TUO v termíne 12.–15. mája 2026. Stačí sa prihlásiť so svojimi FEI prihlasovacími údajmi. Hlasovanie trvá doslova 2 minúty a je anonymné.',
  },
  {
    q: 'Prečo dvaja kandidáti spolu?',
    a: 'Senát FEI má 5 miest pre študentov (50 % zastúpenia). Silnejší spoločný program a koordinovaný postup pri hlasovaní v senáte prináša reálne väčšie šance na presadenie zmien. Dvaja informovaní senátori dokážu efektívnejšie zbierať podnety od rôznych skupín študentov.',
  },
  {
    q: 'Čo bude s podnetmi, ktoré pošleme cez túto stránku?',
    a: 'Každý schválený podnet čítame osobne. Podnety budú slúžiť ako základ pre naše priority v senáte — konkrétne témy, na ktoré sa budeme sústredovať pri hlasovaniach o rozpočte, predpisoch a ďalších otázkach. Po zvolení zverejníme prvú správu s prehľadom prijatých podnetov a naším plánom.',
  },
  {
    q: 'Prečo by ma voľby do senátu mali zaujímať?',
    a: 'Senát priamo ovplyvňuje veci, ktoré zažívaš každý deň — pravidlá skúšok, pridelenie financií na vybavenie laboratórií, podmienky štúdia. Tri roky s pasívnym senátom alebo s aktívnymi zástupcami robí veľký rozdiel. A hlasovanie trvá 2 minúty.',
  },
  {
    q: 'Kedy zverejníte výsledky volieb?',
    a: 'Výsledky volieb zverejní volebná komisia FEI bezprostredne po ukončení hlasovania (po 15. máji 2026). Na tejto stránke zverejníme naše vyjadrenie a ďalší postup.',
  },
]

export default function FaqSection() {
  return (
    <section className="relative py-28 sm:py-36" style={{ background: 'linear-gradient(180deg, #04101f 0%, #020810 100%)' }}>
      <div className="section-divider mb-0" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#818cf8] uppercase tracking-[0.2em] mb-4">
            Otázky & odpovede
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Máš otázky?
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto">
            Odpovieme ti na tie najčastejšie. Ak nenájdeš, čo hľadáš — <a href="#socialne-siete" className="text-blue-400 hover:text-blue-300 transition-colors">napíš nám</a>.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <Accordion className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={i + 1}
                className="glass glass-hover rounded-2xl border-0 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-white hover:text-blue-300 hover:no-underline py-5 [&[data-state=open]]:text-blue-300 transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-blue-200/65 leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
