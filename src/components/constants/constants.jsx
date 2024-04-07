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

  ];

export default images;