import Image from 'next/image';
import styles from './Services.module.css';

function stripHtmlTags(html) {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
  }

const images = [
  {
    id: 2,
    label: 'SHIPPING',
    src: '/rocket.png',
    title: 'We help people and companies send package globally ',
    desc: stripHtmlTags('<b>Do you want to send/receive a gift from a beloved one </b><br />We have helped millions of people send packages globally at very low prices'),
    buttons: [
      { label: 'Learn More', href: '/services/shipping' },
      { label: 'send package', href: '/services/shipping/send' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    id: 3,
    label: 'JOB AGENCY',
    src: '/parcel.png',
    title: 'Get that compound slashed in minutes',
    desc: stripHtmlTags('<h3>Do you want someone to shop for you today? </h3><br />We can help you find someone very quick, very affordable'),
    buttons: [
      { label: 'Browse jobs', href: '/services/jobs' },
      { label: 'Post Job', href: '/services/jobs/send' },
      { label: 'register', href: '/register' },
    ],
  },

  {
    id: 3,
    label: 'TRANSLATIONS',
    src: '/document.png',
    title: 'Narrative Translations',
    desc: stripHtmlTags('<h3>Are you a refugy and want your story told in the best language? </h3><br />We know the language to use to get your story inspiring thus your asylym accepted easily'),
    buttons: [
      { label: 'Browse more', href: '/services/translation' },
      { label: 'Post a request', href: '/services/translation/request' },
      { label: 'contact', href: '/contact' },
    ],
  },
  {
    id: 3,
    label: 'STORIES',
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

const Services = () => {
    return (
        <div className={styles.servicesContainer}>
          {images.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.labelContainer}>
                <span className={styles.label}>{service.label}</span>
              </div>
              <Image src={service.src} alt={service.title} width={150} height={300}/>
              <h3>{service.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: service.desc }} />
              <div className={styles.buttonContainer}>
                {service.buttons.map((button, index) => (
                  <a key={index} href={button.href} className={styles.button}>
                    {button.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    };

export default Services;