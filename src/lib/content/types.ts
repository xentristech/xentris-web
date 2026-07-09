export type Service = {
  slug: string;
  icon: string;
  name: string;
  short: string;
  description: string;
  outcomes: string[];
  features: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  author: string;
  readingTime: string;
  category: string;
  tldr: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
};

export type Dictionary = {
  tagline: string;
  description: string;
  nav: {
    inicio: string;
    servicios: string;
    proyectos: string;
    nosotros: string;
    blog: string;
    contacto: string;
  };
  common: {
    scheduleCall: string;
    exploreServices: string;
    viewServices: string;
    viewService: string;
    readArticle: string;
    requestProposal: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaIntro: string;
    footerNav: string;
    footerServices: string;
    footerLegal: string;
    legalUpdated: string;
    rights: string;
  };
  cookieBanner: {
    message: string;
    accept: string;
    reject: string;
    more: string;
  };
  home: {
    heroEyebrow: string;
    heroTitleA: string;
    heroTitleHighlight: string;
    heroTitleB: string;
    heroP: string;
    ecosystemTitle: string;
    stats: { value: string; label: string }[];
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    stepsEyebrow: string;
    stepsTitle: string;
    stepsIntro: string;
    steps: { n: string; title: string; body: string }[];
    whyEyebrow: string;
    whyTitle: string;
    whyIntro: string;
    reasons: string[];
    whyLink: string;
    quote: string;
    quoteFooter: string;
  };
  servicesPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroP: string;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionIntro: string;
    outcomesEyebrow: string;
    outcomesTitle: string;
    faqEyebrow: string;
    faqTitleSuffix: string;
    otherServices: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroP: string;
    missionEyebrow: string;
    missionText: string;
    visionEyebrow: string;
    visionText: string;
    valuesEyebrow: string;
    valuesTitle: string;
    valuesIntro: string;
    values: { title: string; body: string }[];
    location: string;
    email: string;
    phone: string;
  };
  blogPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroP: string;
  };
  blogPost: {
    summary: string;
    updatedOn: string;
    readingSuffix: string;
    back: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroP: string;
    dataTitle: string;
    dataIntro: string;
    labelEmail: string;
    labelPhone: string;
    labelPhone2: string;
    labelOffice: string;
    promises: string[];
    formTitle: string;
    formSubtitle: string;
    fName: string;
    fNamePh: string;
    fEmail: string;
    fEmailPh: string;
    fCompany: string;
    fCompanyPh: string;
    fService: string;
    fMessage: string;
    fMessagePh: string;
    fSubmit: string;
    fSending: string;
    fSuccess: string;
    fError: string;
    fNote1: string;
    fNote2: string;
    serviceOptions: string[];
    mailSubject: string;
    mailName: string;
    mailEmail: string;
    mailCompany: string;
    mailService: string;
    mailMessage: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
    contact: string;
  };
  projectsPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroP: string;
    visitSite: string;
    viewCode: string;
  };
  assistant: {
    launcher: string;
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    suggestions: string[];
    send: string;
    error: string;
    disclaimer: string;
  };
  meta: Record<
    "home" | "servicios" | "proyectos" | "nosotros" | "blog" | "contacto",
    { title: string; description: string }
  >;
  services: Service[];
  posts: Post[];
};
