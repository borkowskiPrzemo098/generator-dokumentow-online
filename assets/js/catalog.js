/* Katalog generatorów — jedno źródło prawdy dla strony głównej, wyszukiwarki,
   podobnych generatorów i skryptu tools/build.mjs. Nowy generator = nowy wpis tutaj. */
(function (root) {
  var ICONS = {
    /* dokumenty */
    'file-user': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/><circle cx="12" cy="12" r="2.5"/><path d="M8 18.5c.6-1.8 2.2-3 4-3s3.4 1.2 4 3"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    'calendar-check': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    'thumbs-up': '<path d="M7 10v12"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 2 2.3l-1.4 8a2 2 0 0 1-2 1.7H7V10l4.3-8a3 3 0 0 1 3.7 3.9Z"/>',
    'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'file-x': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/><path d="m9.5 12.5 5 5M14.5 12.5l-5 5"/>',
    'file-pen': '<path d="M12.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9l5 5v2.5"/><path d="M14 2v5h6"/><path d="M8 13h4M8 17h2"/><path d="M20.4 12.6a1.9 1.9 0 1 1 2.7 2.7L17.5 21 14 22l1-3.5Z"/>',
    'receipt': '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    'gavel': '<path d="m14.5 12.5-8 8a2.1 2.1 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'coins': '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    'bus': '<path d="M8 6v6M15 6v6M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2s-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
    'stethoscope': '<path d="M11 2v2M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    'handshake': '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    'hourglass': '<path d="M5 22h14M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
    'user-minus': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6"/>',
    'clipboard-check': '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    'notebook-pen': '<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4M2 10h4M2 14h4M2 18h4"/><path d="M21.4 5.6a2 2 0 1 0-2.8-2.8L13 8.4 12 12l3.6-1Z"/>',
    'package-check': '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/>',
    'calendar-clock': '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4M8 2v4M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"/>',
    'cart': '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    'dumbbell': '<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',
    'utensils': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    'contact': '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M13 10h5M13 14h4"/>',
    'tag': '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    'award': '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
    'party': '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2s-2.83-4.17-2-5 3.07.07 5 2Z"/>',
    'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    /* kategorie */
    'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/><path d="M8 13h8M8 17h5"/>',
    'clipboard-list': '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    'gift': '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C9.5 3 11 5.5 12 8c1-2.5 2.5-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    'heart-pulse': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
    'layers': '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    /* interfejs */
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'plus': '<path d="M5 12h14M12 5v14"/>',
    'minus': '<path d="M5 12h14"/>',
    'x': '<path d="M18 6 6 18M6 6l12 12"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    'eye': '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    'home': '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    'grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    'star': '<path d="M11.5 2.3a.5.5 0 0 1 1 0l2.3 4.7a2 2 0 0 0 1.6 1.1l5.2.8a.5.5 0 0 1 .3.9l-3.8 3.7a2 2 0 0 0-.6 1.9l.9 5.2a.5.5 0 0 1-.8.6l-4.6-2.5a2 2 0 0 0-2 0l-4.7 2.5a.5.5 0 0 1-.7-.6l.9-5.2a2 2 0 0 0-.6-1.9L2.6 9.8a.5.5 0 0 1 .3-.9l5.2-.8a2 2 0 0 0 1.6-1.1Z"/>',
    'help': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    'list-checks': '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8M13 12h8M13 18h8"/>',
    'zap': '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    'device': '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-4"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>',
    'printer': '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    'maximize': '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    'calculator': '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/>',
    'external': '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };

  var CATEGORIES = [
    { slug: 'kariera', name: 'Kariera', icon: 'briefcase' },
    { slug: 'pisma', name: 'Pisma formalne', icon: 'file-text' },
    { slug: 'organizacja', name: 'Organizacja i biznes', icon: 'clipboard-list' },
    { slug: 'wizerunek', name: 'Wizerunek firmy', icon: 'contact' },
    { slug: 'okolicznosciowe', name: 'Okolicznościowe', icon: 'gift' },
    { slug: 'zdrowie', name: 'Zdrowie i sport', icon: 'heart-pulse' }
  ];

  var ITEMS = [
    /* ---------- Kariera ---------- */
    { slug: 'cv', name: 'Generator CV', cat: 'kariera', icon: 'file-user', popular: 1,
      kw: 'cv życiorys curriculum vitae praca rekrutacja kreator',
      lead: 'Uzupełnij dane w formularzu — CV zmienia się na bieżąco w podglądzie. Wybierz kolor i pobierz gotowy PDF jednym kliknięciem.',
      intro: 'Generator CV układa Twoje dane w czytelny, dwukolumnowy życiorys: kontakt, umiejętności i języki w kolorowej kolumnie bocznej, doświadczenie i wykształcenie w części głównej. Możesz dodać dowolną liczbę stanowisk i szkół oraz wybrać jeden z sześciu kolorów.',
      faq: [
        { q: 'Jak długie powinno być CV?', a: 'W większości rekrutacji wystarczy jedna strona A4. Dwie strony mają sens przy dłuższym doświadczeniu, gdy każde stanowisko wnosi coś istotnego do oferty.' },
        { q: 'Czy muszę dodawać klauzulę RODO?', a: 'Nie zawsze. Zgoda na przetwarzanie danych jest potrzebna m.in. wtedy, gdy chcesz, aby pracodawca wykorzystał CV także w przyszłych rekrutacjach. Jeśli ogłoszenie wymaga klauzuli, dopisz ją w polu „O mnie” lub dodaj pod wydrukiem.' }
      ] },
    { slug: 'list-motywacyjny', name: 'List motywacyjny', cat: 'kariera', icon: 'mail', popular: 1,
      kw: 'list motywacyjny podanie o pracę aplikacja',
      intro: 'List motywacyjny uzupełnia CV: tłumaczy, dlaczego aplikujesz właśnie na to stanowisko i co wnosisz do firmy. Generator sam ułoży formalny układ z nagłówkiem, datą, danymi adresata i miejscem na podpis.',
      faq: [
        { q: 'Jak długi powinien być list motywacyjny?', a: 'Najlepiej zmieścić się na jednej stronie — trzy, cztery krótkie akapity: dlaczego ta firma, co konkretnie potrafisz i prośba o spotkanie.' },
        { q: 'Czy jeden list mogę wysłać do wielu firm?', a: 'Lepiej nie. Rekruterzy szybko rozpoznają list pisany „do wszystkich”. Zmień przynajmniej nazwę stanowiska, firmę i akapit o tym, dlaczego chcesz pracować właśnie tam.' }
      ] },
    { slug: 'wypowiedzenie-umowy-o-prace', name: 'Wypowiedzenie umowy o pracę', cat: 'kariera', icon: 'log-out',
      kw: 'wypowiedzenie umowy o pracę pracownik rezygnacja z pracy odejście z pracy',
      intro: 'Wypowiedzenie umowy o pracę składane przez pracownika wymaga formy pisemnej. Generator przygotuje pismo z danymi stron, datą zawarcia umowy, okresem wypowiedzenia i prośbą o świadectwo pracy.',
      faq: [
        { q: 'Jaki okres wypowiedzenia mnie obowiązuje?', a: 'Przy umowie na czas nieokreślony zależy on od stażu u danego pracodawcy: 2 tygodnie przy stażu krótszym niż 6 miesięcy, 1 miesiąc przy stażu od 6 miesięcy do 3 lat i 3 miesiące przy stażu co najmniej 3-letnim.' },
        { q: 'Czy mogę odejść szybciej niż kończy się okres wypowiedzenia?', a: 'Tak, jeśli pracodawca się zgodzi — wtedy zamiast wypowiedzenia strony podpisują porozumienie o rozwiązaniu umowy z uzgodnioną datą.' }
      ] },
    { slug: 'podanie-o-urlop', name: 'Podanie o urlop', cat: 'kariera', icon: 'calendar-check',
      kw: 'podanie o urlop wniosek urlopowy urlop wypoczynkowy',
      intro: 'Wniosek o urlop wypoczynkowy to krótkie pismo do przełożonego z terminem i liczbą dni urlopu. Generator uzupełni treść na podstawie dat, które wpiszesz.',
      faq: [
        { q: 'Ile dni urlopu mi przysługuje?', a: '20 dni w roku przy stażu pracy krótszym niż 10 lat i 26 dni przy stażu co najmniej 10-letnim. Do stażu wlicza się również okres nauki, np. ukończone studia.' },
        { q: 'Czy wniosek musi być na papierze?', a: 'To zależy od regulaminu pracy u Twojego pracodawcy. Wiele firm przyjmuje wnioski mailowo lub w systemie kadrowym — wydruk przyda się tam, gdzie obowiązuje forma papierowa.' }
      ] },
    { slug: 'list-referencyjny', name: 'List referencyjny', cat: 'kariera', icon: 'thumbs-up',
      kw: 'list referencyjny referencje rekomendacja pracownika opinia',
      intro: 'List referencyjny to rekomendacja wystawiana przez pracodawcę lub przełożonego. Generator przygotuje treść z okresem zatrudnienia, stanowiskiem i opisem osiągnięć pracownika.',
      faq: [
        { q: 'Czy pracodawca musi wystawić referencje?', a: 'Nie. W przeciwieństwie do świadectwa pracy list referencyjny jest dobrowolny — dlatego warto poprosić o niego jeszcze przed odejściem z firmy.' },
        { q: 'Co powinno się znaleźć w liście referencyjnym?', a: 'Okres zatrudnienia, stanowisko, zakres obowiązków, konkretne osiągnięcia i ocena pracownika, a na końcu podpis osoby wystawiającej z danymi kontaktowymi.' }
      ] },
    { slug: 'zaswiadczenie-o-zatrudnieniu', name: 'Zaświadczenie o zatrudnieniu', cat: 'kariera', icon: 'briefcase',
      kw: 'zaświadczenie o zatrudnieniu i zarobkach do banku kredyt',
      intro: 'Zaświadczenie o zatrudnieniu i wynagrodzeniu wystawia pracodawca, najczęściej na potrzeby banku, urzędu lub wynajmującego. Generator przygotuje treść z rodzajem umowy, stażem i średnim wynagrodzeniem.',
      faq: [
        { q: 'Czy bank przyjmie takie zaświadczenie?', a: 'Wiele banków wymaga własnego formularza. Zanim wydrukujesz dokument, zapytaj w banku, czy akceptuje zaświadczenie wystawione przez pracodawcę na jego papierze.' },
        { q: 'Kto podpisuje zaświadczenie?', a: 'Osoba upoważniona po stronie pracodawcy, zwykle pracownik działu kadr lub właściciel firmy. Zaświadczenie opatruje się też pieczątką firmową.' }
      ] },

    /* ---------- Pisma formalne ---------- */
    { slug: 'wypowiedzenie-umowy', name: 'Wypowiedzenie umowy', cat: 'pisma', icon: 'file-x', popular: 1,
      kw: 'wypowiedzenie umowy abonament siłownia ubezpieczenie telefon internet usługa',
      intro: 'Uniwersalny wzór wypowiedzenia umowy o świadczenie usług: abonamentu telefonicznego, internetu, karnetu na siłownię czy ubezpieczenia. Wpisujesz numer i datę umowy, a generator układa formalne pismo z prośbą o potwierdzenie.',
      faq: [
        { q: 'Jak wysłać wypowiedzenie, żeby mieć dowód?', a: 'Najpewniej listem poleconym za potwierdzeniem odbioru albo złożyć osobiście i poprosić o potwierdzenie na kopii. Wiele firm przyjmuje też wypowiedzenia przez formularz na stronie lub w aplikacji.' },
        { q: 'Od kiedy liczy się okres wypowiedzenia?', a: 'Zwykle od dnia, w którym firma otrzymała pismo, a czasem od końca okresu rozliczeniowego. Dokładną zasadę znajdziesz w swojej umowie lub regulaminie usługi.' }
      ] },
    { slug: 'upowaznienie', name: 'Upoważnienie / pełnomocnictwo', cat: 'pisma', icon: 'file-pen', popular: 1,
      kw: 'upoważnienie pełnomocnictwo odbiór dokumentów w moim imieniu',
      lead: 'Uzupełnij dane obu osób i zakres sprawy — gotowe upoważnienie pojawi się w podglądzie.',
      intro: 'Upoważnienie pozwala innej osobie załatwić konkretną sprawę w Twoim imieniu, np. odebrać dokument, list polecony czy zaświadczenie. Generator uzupełni dane obu osób, numery dowodów i zakres upoważnienia.',
      faq: [
        { q: 'Czym różni się upoważnienie od pełnomocnictwa?', a: 'Upoważnienie dotyczy zwykle prostej czynności, np. odbioru dokumentu. Pełnomocnictwo pozwala działać w Twoim imieniu w sprawach prawnych — przy niektórych czynnościach, np. sprzedaży mieszkania, wymaga formy aktu notarialnego.' },
        { q: 'Czy upoważnienie musi być poświadczone?', a: 'Zwykle wystarczy własnoręczny podpis. Niektóre instytucje, np. banki czy urzędy, mają własne formularze albo wymagają podpisu złożonego na miejscu — warto sprawdzić to wcześniej.' }
      ] },
    { slug: 'wezwanie-reklamacja', name: 'Wezwanie do zapłaty / reklamacja', cat: 'pisma', icon: 'receipt', popular: 1,
      kw: 'wezwanie do zapłaty przedsądowe reklamacja towaru usługi zwrot',
      intro: 'Jeden generator na dwa pisma: wezwanie do zapłaty zaległej kwoty oraz reklamację towaru lub usługi. Wybierasz rodzaj pisma, a formularz dopasowuje pola i treść.',
      faq: [
        { q: 'Po co wysyłać wezwanie do zapłaty?', a: 'To zwykle ostatni krok przed skierowaniem sprawy do sądu i często pierwszy dowód, że próbowałeś rozwiązać sprawę polubownie. Wyślij je listem poleconym, żeby mieć potwierdzenie doręczenia.' },
        { q: 'Ile sprzedawca ma czasu na odpowiedź na reklamację?', a: 'Na reklamację konsumenta sprzedawca powinien odpowiedzieć w ciągu 14 dni. Zachowaj kopię pisma i dowód jego wysłania lub złożenia.' }
      ] },
    { slug: 'odwolanie-od-decyzji', name: 'Odwołanie od decyzji', cat: 'pisma', icon: 'gavel',
      kw: 'odwołanie od decyzji zus urząd ubezpieczyciel sprzeciw',
      intro: 'Wzór odwołania od decyzji urzędu, ZUS-u lub ubezpieczyciela. Wpisujesz numer i datę decyzji, uzasadnienie oraz to, czego się domagasz — generator ułoży formalne pismo.',
      faq: [
        { q: 'Ile mam czasu na odwołanie?', a: 'Termin zależy od instytucji i zawsze jest podany w pouczeniu na końcu decyzji. W postępowaniu administracyjnym to zwykle 14 dni od doręczenia, a od decyzji ZUS odwołanie wnosi się w ciągu miesiąca.' },
        { q: 'Gdzie złożyć odwołanie?', a: 'Najczęściej za pośrednictwem instytucji, która wydała decyzję — dokładny adres i sposób złożenia znajdziesz w pouczeniu.' }
      ] },
    { slug: 'odstapienie-od-umowy', name: 'Odstąpienie od umowy (14 dni)', cat: 'pisma', icon: 'rotate-ccw',
      kw: 'odstąpienie od umowy zwrot towaru 14 dni zakupy internetowe',
      intro: 'Kupując przez internet, masz 14 dni na odstąpienie od umowy bez podawania przyczyny. Generator przygotuje oświadczenie z numerem zamówienia, nazwą towaru i numerem konta do zwrotu pieniędzy.',
      faq: [
        { q: 'Od kiedy liczy się 14 dni?', a: 'Przy zakupie towaru — od dnia, w którym go otrzymałeś. Wystarczy, że przed upływem terminu wyślesz oświadczenie do sprzedawcy.' },
        { q: 'Kiedy dostanę zwrot pieniędzy?', a: 'Sprzedawca powinien oddać pieniądze w ciągu 14 dni od otrzymania oświadczenia, ale może wstrzymać zwrot do czasu, aż otrzyma towar lub dowód jego odesłania.' }
      ] },
    { slug: 'wniosek-o-raty', name: 'Wniosek o rozłożenie na raty', cat: 'pisma', icon: 'coins',
      kw: 'wniosek o rozłożenie długu na raty zaległość spłata',
      intro: 'Pismo z prośbą o rozłożenie zadłużenia na raty — do wierzyciela, firmy windykacyjnej lub dostawcy usług. Proponujesz liczbę i wysokość rat oraz krótko uzasadniasz prośbę.',
      faq: [
        { q: 'Czy wierzyciel musi się zgodzić?', a: 'Nie, to jego decyzja. Konkretna propozycja rat, które realnie jesteś w stanie płacić, zwiększa szansę na zgodę.' },
        { q: 'Co z zaległościami podatkowymi?', a: 'W urzędzie skarbowym obowiązuje osobna procedura — wniosek o ulgę w spłacie. Ten wzór sprawdzi się przy długach wobec firm i osób prywatnych.' }
      ] },
    { slug: 'zgoda-na-wyjazd-dziecka', name: 'Zgoda na wyjazd dziecka', cat: 'pisma', icon: 'bus',
      kw: 'zgoda rodzica na wyjazd dziecka wycieczka kolonie obóz za granicę',
      intro: 'Pisemna zgoda rodzica lub opiekuna na udział dziecka w wycieczce szkolnej, obozie czy koloniach. Zawiera dane dziecka, termin i organizatora wyjazdu oraz informacje o zdrowiu.',
      faq: [
        { q: 'Kiedy taka zgoda się przydaje?', a: 'Przy wyjazdach szkolnych, obozach i koloniach oraz podróżach dziecka z jednym rodzicem lub bez rodziców. Organizatorzy i przewoźnicy często mają własne formularze — zapytaj o nie wcześniej.' },
        { q: 'Czy trzeba podpisać zgodę u notariusza?', a: 'Zwykle wystarczy zwykły podpis. Poświadczenia notarialnego wymagają niektóre kraje lub przewoźnicy przy podróży zagranicznej — sprawdź zasady przed wyjazdem.' }
      ] },
    { slug: 'zgoda-na-zabieg-dziecka', name: 'Zgoda na opiekę medyczną dziecka', cat: 'pisma', icon: 'stethoscope',
      kw: 'zgoda na zabieg medyczny dziecka opieka medyczna upoważnienie lekarz',
      intro: 'Upoważnienie dla opiekuna — wychowawcy, trenera lub krewnego — do podejmowania decyzji o pomocy medycznej, gdy rodzic nie może być na miejscu. Przydaje się na wyjazdach i obozach.',
      faq: [
        { q: 'Czy takie upoważnienie wystarczy do każdego zabiegu?', a: 'Nie. W nagłych sytuacjach ułatwia udzielenie pomocy, ale przy planowanych i poważniejszych zabiegach placówka może wymagać zgody lub obecności rodzica.' },
        { q: 'Co warto dopisać w zgodzie?', a: 'Numer telefonu do rodzica, informacje o alergiach, chorobach przewlekłych i przyjmowanych lekach.' }
      ] },
    { slug: 'podziekowanie-za-wspolprace', name: 'Podziękowanie za współpracę', cat: 'pisma', icon: 'handshake',
      kw: 'podziękowanie za współpracę list biznesowy klient kontrahent',
      intro: 'Formalne podziękowanie dla partnera biznesowego, klienta lub kontrahenta. Dobrze sprawdza się na koniec roku, po zakończeniu projektu lub przy zmianie opiekuna klienta.',
      faq: [
        { q: 'Wysłać mailem czy na papierze?', a: 'Wydrukowany i podpisany list robi większe wrażenie. Możesz też wysłać PDF mailem, a wydruk dołączyć do upominku.' },
        { q: 'Co napisać w podziękowaniu?', a: 'Konkret: za jaki projekt lub okres dziękujesz, co szczególnie doceniasz i że liczysz na dalszą współpracę.' }
      ] },
    { slug: 'wniosek-o-przedluzenie-terminu', name: 'Wniosek o przedłużenie terminu', cat: 'pisma', icon: 'hourglass',
      kw: 'wniosek o przedłużenie terminu płatności realizacji złożenia dokumentów',
      intro: 'Uniwersalne pismo z prośbą o wydłużenie terminu: płatności, realizacji zlecenia albo złożenia dokumentów. Wpisujesz pierwotny i proponowany termin oraz krótkie uzasadnienie.',
      faq: [
        { q: 'Kiedy złożyć wniosek?', a: 'Jak najwcześniej, zanim minie pierwotny termin. Wniosek złożony po terminie ma znacznie mniejsze szanse na przyjęcie.' },
        { q: 'Czy przedłużenie jest automatyczne?', a: 'Nie — dopóki adresat nie potwierdzi nowego terminu, obowiązuje dotychczasowy. Poproś o odpowiedź na piśmie lub mailem.' }
      ] },
    { slug: 'rezygnacja-z-czlonkostwa', name: 'Rezygnacja z członkostwa', cat: 'pisma', icon: 'user-minus',
      kw: 'rezygnacja z członkostwa klub siłownia stowarzyszenie karnet',
      intro: 'Pismo rezygnujące z członkostwa w klubie, siłowni, stowarzyszeniu lub innej organizacji. Zawiera numer członkostwa i prośbę o potwierdzenie daty zakończenia.',
      faq: [
        { q: 'Czy rezygnacja działa od razu?', a: 'Zależy od regulaminu organizacji — często obowiązuje okres wypowiedzenia lub zakończenie opłaconego okresu. Sprawdź regulamin przed wysłaniem pisma.' },
        { q: 'Jak dostarczyć rezygnację?', a: 'Osobiście z potwierdzeniem na kopii albo listem poleconym. Zachowaj dowód doręczenia na wypadek sporu o opłaty.' }
      ] },

    /* ---------- Organizacja i biznes ---------- */
    { slug: 'lista-obecnosci', name: 'Lista obecności', cat: 'organizacja', icon: 'clipboard-check',
      kw: 'lista obecności szkolenie zebranie zajęcia podpisy uczestników',
      intro: 'Gotowy do druku arkusz obecności z kolumną na podpisy. Dodajesz dowolną liczbę uczestników, a numeracja układa się sama.',
      faq: [
        { q: 'Ile osób zmieści się na jednej stronie?', a: 'Około 30 wierszy na stronie A4. Przy dłuższej liście przeglądarka podzieli dokument na kolejne strony.' },
        { q: 'Czy mogę zostawić puste wiersze?', a: 'Tak — dodaj pozycje bez nazwiska, a uczestnicy wpiszą się ręcznie na wydruku.' }
      ] },
    { slug: 'protokol-spotkania', name: 'Protokół ze spotkania', cat: 'organizacja', icon: 'notebook-pen',
      kw: 'protokół ze spotkania zebrania notatka ustalenia',
      intro: 'Uporządkowany protokół z zebrania: temat, data, uczestnicy oraz tabela z punktami spotkania, ustaleniami i osobami odpowiedzialnymi.',
      faq: [
        { q: 'Co powinien zawierać protokół?', a: 'Datę i miejsce, listę uczestników, omawiane tematy oraz konkretne ustalenia: kto, co i do kiedy.' },
        { q: 'Kiedy rozesłać protokół?', a: 'Najlepiej tego samego lub następnego dnia, póki ustalenia są świeże — uczestnicy mogą wtedy zgłosić ewentualne poprawki.' }
      ] },
    { slug: 'potwierdzenie-odbioru', name: 'Potwierdzenie odbioru', cat: 'organizacja', icon: 'package-check',
      kw: 'potwierdzenie odbioru towaru dokumentów sprzętu protokół przekazania',
      intro: 'Prosty druk potwierdzający przekazanie towaru, sprzętu firmowego lub dokumentów, z listą pozycji i miejscem na podpisy obu stron.',
      faq: [
        { q: 'Ile egzemplarzy przygotować?', a: 'Dwa — po jednym dla wydającego i odbierającego, oba podpisane przez obie strony.' },
        { q: 'Co wpisać przy sprzęcie firmowym?', a: 'Nazwę, model i numer seryjny lub inwentarzowy każdego urządzenia oraz akcesoria, np. ładowarkę.' }
      ] },
    { slug: 'grafik-pracy', name: 'Grafik pracy', cat: 'organizacja', icon: 'calendar-clock',
      kw: 'grafik pracy harmonogram dyżurów zmiany rozkład czasu pracy',
      intro: 'Tygodniowy grafik pracy dla zespołu w poziomym układzie A4. Dla każdego pracownika wpisujesz godziny na każdy dzień albo „W” dla dnia wolnego.',
      faq: [
        { q: 'Kiedy trzeba przekazać grafik pracownikom?', a: 'Pracodawca przekazuje rozkład czasu pracy co najmniej na tydzień przed rozpoczęciem okresu, na który został sporządzony.' },
        { q: 'Jak wydrukować grafik poziomo?', a: 'Orientacja pozioma ustawia się automatycznie. Jeśli przeglądarka jej nie przyjmie, wybierz „Poziomo” w oknie drukowania.' }
      ] },
    { slug: 'plan-lekcji', name: 'Plan lekcji', cat: 'organizacja', icon: 'book-open',
      kw: 'plan lekcji plan zajęć szkoła tygodniowy rozkład',
      intro: 'Tygodniowy plan lekcji lub zajęć pozaszkolnych w czytelnej tabeli od poniedziałku do piątku. Dodajesz godziny lekcyjne i przedmioty.',
      faq: [
        { q: 'Czy mogę dodać zajęcia dodatkowe?', a: 'Tak — dodaj kolejne godziny i wpisz w nie np. basen, język obcy czy korepetycje.' },
        { q: 'Jak zostawić wolne pole?', a: 'Zostaw komórkę pustą — na wydruku pojawi się puste pole, które można uzupełnić ręcznie.' }
      ] },
    { slug: 'lista-zakupow', name: 'Lista zakupów', cat: 'organizacja', icon: 'cart',
      kw: 'lista zakupów checklista do druku sklep',
      intro: 'Checklista zakupów z polami do odhaczania. Wpisujesz produkty, każdy w nowej linii, i drukujesz albo zapisujesz jako PDF na telefonie.',
      faq: [
        { q: 'Czy lista zapisze się na później?', a: 'Nie — dane nie są nigdzie przechowywane. Zapisz listę jako PDF, jeśli chcesz mieć ją na telefonie.' },
        { q: 'Ile produktów zmieści się na stronie?', a: 'Około 35 pozycji na stronie A4. Dłuższa lista przejdzie na kolejną stronę.' }
      ] },

    /* ---------- Wizerunek firmy ---------- */
    { slug: 'wizytowka', name: 'Wizytówka', cat: 'wizerunek', icon: 'contact', popular: 1,
      kw: 'wizytówka firmowa do druku projekt wizytówki',
      lead: 'Uzupełnij dane i wybierz kolor. Dostaniesz arkusz A4 z pięcioma parami wizytówek 90 × 50 mm, gotowy do druku i cięcia.',
      intro: 'Generator wizytówek przygotowuje awers z imieniem, stanowiskiem i kontaktem oraz rewers z nazwą firmy i hasłem. Wizytówki mają wymiar 90 × 50 mm, najpopularniejszy w Polsce, a jeden arkusz A4 mieści pięć par.',
      faq: [
        { q: 'Na jakim papierze drukować wizytówki?', a: 'Najlepiej na grubym papierze lub kartonie 250–350 g/m². Po wydruku wytnij wizytówki wzdłuż krawędzi, najlepiej gilotyną lub nożykiem przy linijce.' },
        { q: 'Jak zrobić wizytówkę dwustronną?', a: 'Na arkuszu awersy są w lewej kolumnie, a rewersy w prawej. Wytnij każdą parę i sklej ją tyłem do siebie. Na grubym papierze możesz też wydrukować tylko awersy.' }
      ] },
    { slug: 'etykiety-adresowe', name: 'Etykiety adresowe', cat: 'wizerunek', icon: 'tag',
      kw: 'etykiety adresowe naklejki na przesyłki paczki koperty',
      intro: 'Arkusz A4 z etykietami adresowymi: jeden nadawca, wielu odbiorców. Wpisujesz odbiorców po jednym w linii, a generator układa etykiety w trzech kolumnach.',
      faq: [
        { q: 'Czy mogę drukować na arkuszach samoprzylepnych?', a: 'Tak, ale wymiary gotowych arkuszy różnią się między producentami. Zrób najpierw wydruk próbny na zwykłej kartce i przyłóż go do arkusza.' },
        { q: 'Jak wpisać odbiorcę?', a: 'Imię i nazwisko lub nazwę firmy, potem znak „|” i adres, np. „Jan Nowak | ul. Leśna 8/2, 02-200 Warszawa”.' }
      ] },

    /* ---------- Okolicznościowe ---------- */
    { slug: 'certyfikat', name: 'Certyfikat / dyplom', cat: 'okolicznosciowe', icon: 'award',
      kw: 'certyfikat dyplom uznania ukończenia kursu konkurs podziękowanie',
      intro: 'Ozdobny dyplom w poziomym formacie A4 — na zakończenie kursu, dla zwycięzcy konkursu albo jako podziękowanie. Uzupełniasz tytuł, imię, uzasadnienie i podpisy.',
      faq: [
        { q: 'Na jakim papierze wydrukować dyplom?', a: 'Dyplom najlepiej wygląda na grubszym, matowym papierze 160–250 g/m², np. kremowym lub z fakturą.' },
        { q: 'Czy mogę zmienić treść na podziękowanie?', a: 'Tak — każde pole jest edytowalne, więc ten sam szablon posłuży jako dyplom, certyfikat lub podziękowanie.' }
      ] },
    { slug: 'zaproszenie', name: 'Zaproszenie', cat: 'okolicznosciowe', icon: 'party',
      kw: 'zaproszenie na urodziny wesele imprezę event firmowy',
      intro: 'Eleganckie zaproszenie na urodziny, rocznicę lub wydarzenie firmowe, z wyborem koloru. Wpisujesz okazję, datę, miejsce i gospodarzy.',
      faq: [
        { q: 'Jak wydrukować kilka zaproszeń?', a: 'Pobierz PDF i ustaw w oknie drukowania żądaną liczbę kopii. Na grubszym papierze zaproszenie wygląda jak z drukarni.' },
        { q: 'Czy mogę wysłać zaproszenie mailem?', a: 'Tak — zapisz je jako PDF i dołącz do wiadomości lub wyślij w komunikatorze.' }
      ] },
    { slug: 'kartka-z-podziekowaniem', name: 'Kartka z podziękowaniem', cat: 'okolicznosciowe', icon: 'heart',
      kw: 'kartka z podziękowaniem gratulacje życzenia kartka okolicznościowa',
      intro: 'Ozdobna kartka z gratulacjami, podziękowaniem lub życzeniami, z wyborem koloru. Idealna dla współpracownika, nauczyciela czy klienta.',
      faq: [
        { q: 'Jakie życzenia wpisać?', a: 'Krótkie i osobiste działają najlepiej — jedno, dwa zdania o konkretnej okazji i podpis.' },
        { q: 'Na jakim papierze drukować kartkę?', a: 'Na grubszym papierze 200–300 g/m². Po wydruku możesz przyciąć kartkę do rozmiaru ramki.' }
      ] },

    /* ---------- Zdrowie i sport ---------- */
    { slug: 'plan-treningowy', name: 'Plan treningowy', cat: 'zdrowie', icon: 'dumbbell',
      kw: 'plan treningowy siłownia ćwiczenia serie powtórzenia',
      intro: 'Czytelny plan treningowy w tabeli: ćwiczenie, liczba serii, powtórzeń i przerwa. Wydrukuj go i zabierz na siłownię albo zapisz jako PDF w telefonie.',
      faq: [
        { q: 'Jak ułożyć plan dla początkujących?', a: 'Zacznij od kilku ćwiczeń wielostawowych na całe ciało, 2–3 treningów w tygodniu i umiarkowanego ciężaru. Przed nowym planem warto skonsultować się z trenerem.' },
        { q: 'Czy mogę zrobić kilka planów?', a: 'Tak — przygotuj osobny PDF dla każdego dnia treningowego, np. „Trening A” i „Trening B”.' }
      ] },
    { slug: 'plan-posilkow', name: 'Plan posiłków', cat: 'zdrowie', icon: 'utensils',
      kw: 'plan posiłków jadłospis dieta tygodniowy menu',
      intro: 'Tygodniowy jadłospis w przejrzystej tabeli: śniadanie, obiad i kolacja na każdy dzień. Ułatwia zakupy i planowanie posiłków dla całej rodziny.',
      faq: [
        { q: 'Czy mogę dodać przekąski?', a: 'Wpisz je razem z posiłkiem, np. „Owsianka + jabłko”, albo dodaj osobny wiersz dla przekąsek.' },
        { q: 'Czy to plan dietetyczny?', a: 'To narzędzie do planowania, nie zalecenia żywieniowe. Przy diecie leczniczej skonsultuj jadłospis z dietetykiem.' }
      ] }
  ];

  root.GD_CATALOG = { icons: ICONS, categories: CATEGORIES, items: ITEMS };
})(typeof window !== 'undefined' ? window : globalThis);
