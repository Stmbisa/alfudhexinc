function stripHtmlTags(html) {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
}


export const images = [

    {
      id: 1,
      src:  '/hero.gif',
      title: 'Welcome to Alfundex',
      desc: stripHtmlTags('<b>Narrative Story chronicles Services for refugies, and Translations services.  </b><br />' +
      'We also Help Businesses and individuals to ship packages, find affordable good people ready to do any job very affordably'),
      buttons: [
        { label: 'Learn More', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
    },

    {
      id: 1,
      src:  '/hero.gif',
      title: 'We live by expressing unity, solidality love and passion',
      desc: stripHtmlTags('<b>Do you need someone who will hold your hand and treat you like a family? </b><br />' +
      'To day approach and trust us to deliver amazing results,we will coach you, guide you and at then end you will have loved every step. whatever service you need in what we help'),
      buttons: [
        { label: 'Learn More', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
    },

    {
      id: 2,
      src: '/shipping.jpg',
      title: 'Send a package globally with us',
      desc: '<b>Are you trying to send/receive a package in/from Africa, Europe?  </b><br />' +
      'We can helpyou send any package anywhere at a very affordabale price',
      buttons: [
        { label: 'Learn More', href: '/services/shipping' },
        { label: 'send package', href: '/services/shipping/send' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      id: 3,
      src: '/job.jpg',
      title: 'find and employ affordable and trustworthy workers',
      desc: '<h3>Do you have a quick gig you want done today? </h3><br />' +
      'We can help you find someone very quick, very affordable',
      buttons: [
        { label: 'Browse jobs', href: '/services/jobs' },
        { label: 'Post Job', href: '/services/jobs/send' },
        { label: 'register', href: '/register' },
      ],
    },

    {
      id: 3,
      src: '/author.png',
      title: 'Story telling',
      desc: stripHtmlTags('<h3>Do you have an inspiring story you want the world to know? </h3><br />We help the asylym seeker tell their stories and inspire the world  '),
      buttons: [
        { label: 'Browse more', href: '/services/translation' },
        { label: 'Post a request', href: '/services/translation/request' },
        { label: 'contact', href: '/contact' },
      ],
    },

  ];

export default images;