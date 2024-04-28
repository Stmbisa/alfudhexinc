function stripHtmlTags(html) {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
}


export const images = [

  {
    id: 1,
    src: '/hero.gif',
    title: 'Welcome to Alfudhex inc',
    desc: '<b>Job/hiring solutions, translation services and shiping globally </b><br />' +
      'We help businesses and individuals finde the best employees, we offer unmatched translation services in any language from any location globally, and we help asylym seeker to to tell their story aligned and also help them find jobs',
    buttons: [
      { label: 'Learn More', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },

  {
    id: 2,
    src: '/job.jpg',
    title: 'The Leading Job Hiring Platform',
    desc: "<b> Find the right people with our all-in-one job hiring platform. </b><br />High-touch support and powerful recruiting tools help you find the top talent you need so you can focus on your business.\<ul><li><b>- Pre-qualified candidates in Applicant Tracking System<b></li><li><b>- Trustworthy people</b></li><li><b>- Pre-qualified candidates in Applicant Tracking System<b></li></ul> ",

    buttons: [
      { label: 'Browse more', href: '/services/translation' },
      { label: 'Post a request', href: '/services/translation/request' },
      { label: 'contact', href: '/contact' },
    ],
  },

  {
    id: 3,
    src: '/alfundex.png',
    title: 'We live by expressing unity, solidality love and passion',
    desc: '<b>To Us Its More Of Doing Well While Doing Good </b><br />' +
      'To day approach and trust us to deliver amazing results,we will coach you, guide you and at then end you will have loved every step. whatever service you need in what we help',
    buttons: [
      { label: 'Learn More', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },

  {
    id: 4,
    src: '/shipping.jpg',
    title: 'Send A Package Globally With Us',
    desc: '<b>Are you trying to send/receive a package in/from Africa, Europe?  </b><br />' +
      'We can helpyou send any package anywhere at a very affordabale price',
    buttons: [
      { label: 'Learn More', href: '/services/shipping' },
      { label: 'send package', href: '/services/shipping/send' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  // {
  //   id: 3,
  //   src: '/job.jpg',
  //   title: 'The leading job hiring platform',
  //   desc: '<h3>Find the right people with our all-in-one job hiring platform.  </h3><br />' +
  //     ' High-touch support and powerful recruiting tools help you find the top talent you need so you can focus on your business.\<ul><li>Pre-qualified candidates in Applicant Tracking System</li><li>Trustworthy people</li><li>Pre-qualified candidates in Applicant Tracking System</li></ul>  ',
  //   buttons: [
  //     { label: 'Browse jobs', href: '/services/jobs' },
  //     { label: 'Post Job', href: '/services/jobs/send' },
  //     { label: 'Demo', href: '/contact' },
  //   ],
  // },

  {
    id: 5,
    src: '/author.png',
    title: 'Translation and Interpretation Services',
    desc: "<h3> We Make Sure That You're Understood </h3><br />Our team completes certified translations of a number of different documents into more than 150 languages. Especially, We perform accurate translation of:\<ul><li><b>- Birth certificates</b></li><li><b>- Diplomas</b></li><li><b>- Legal documents</b></li><li><b>- Education and school documents</b></li><li><b>-Many more</b></li></ul> ",

    buttons: [
      { label: 'Browse more', href: '/services/translation' },
      { label: 'Post a request', href: '/services/translation/request' },
      { label: 'contact', href: '/contact' },
    ],
  },

];

export default images;