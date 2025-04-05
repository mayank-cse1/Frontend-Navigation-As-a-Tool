import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const startTour = (page) => {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    exitOnEsc: true,
    keyboardNavigation: true,
    defaultStepOptions: {
      classes: 'shepherd-theme-dark',
      cancelIcon: { enabled: true },
      scrollTo: { behavior: 'smooth', block: 'center' },
    },
  });

  let steps = [];

  if (page === 'home') {
    
    steps = [
        {
          id: 'url-input',
          text: 'Enter the URL of the article you want to analyze. It processes dev.to and medium articles.',
          attachTo: { element: '.url-input', on: 'bottom' },
          buttons: [
            {
              text: 'next',
              action: () => {
                tour.next();
            }
            }
          ]
        },
        {
          id: 'submit-button',
          text: 'Click this button to submit the URL and start the analysis, it may take a few minutes.',
          attachTo: { element: '.submit-button', on: 'bottom' },
          buttons: [
            {
              text: 'back',
              action: tour.back
            },
            {
              text: 'end',
              action: () => {
                scrollToTop();
                tour.complete();
            }
            }
          ]
        }
      ];
  
  } else if (page === '') {
    steps = [
        {
            id: 'brand',
            text: 'Welcome to Article Insight!  Let\'s take you on a quick tour.',
            attachTo: { element: '.text-3xl', on: 'bottom' },
            buttons: [
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'nav-links',
            text: 'Here are the navigation links to different pages.',
            attachTo: { element: '.nav-links', on: 'bottom' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'github-link',
            text: 'Here is the GitHub link to this project.',
            attachTo: { element: '#github-link', on: 'bottom' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'hero-title',
            text: 'This is the main title of our application.',
            attachTo: { element: '.hero-title', on: 'bottom' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'hero-description',
            text: 'Here is a brief description of what our application does.',
            attachTo: { element: '.hero-description', on: 'bottom' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'hero-buttons',
            text: 'You can try our application or vote for us using these buttons.',
            attachTo: { element: '.hero-buttons', on: 'bottom' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'features',
            text: 'Check out our features..',
            attachTo: { element: '#features', on: 'top' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'next',
                    action: () => {
                        tour.next();
                    }
                }
            ]
        },
        {
            id: 'faq',
            text: 'Learn more about our app. Check out our FAQ sections.',
            attachTo: { element: '#faq', on: 'top' },
            buttons: [
                {
                    text: 'back',
                    action: tour.back
                },
                {
                    text: 'end',
                    action: () => {
                        scrollToTop();
                        tour.complete();
                    }
                }
            ],
            advanceOn: { selector: '.shepherd-modal-overlay-container', event: 'click' }
        }
    ];
  } else if (page === 'about') {
    steps = [
        {
          id: 'article-sum',
          text: 'Here you can see the main feature of our app: Article Summary.',
          attachTo: { element: '#article-sum', on: 'bottom' },
          buttons: [
            {
              text: 'next',
              action: () => tour.next(),
            },
          ],
        },
        {
          id: 'key-features',
          text: 'These are the additional features our app offers.',
          attachTo: { element: '.key-features', on: 'bottom' },
          buttons: [
            {
              text: 'back',
              action: tour.back,
            },
            {
              text: 'next',
              action: () => tour.next(),
            },
          ],
        },
        {
          id: 'benefits',
          text: 'Discover the benefits of using our app.',
          attachTo: { element: '.benefits', on: 'top' },
          buttons: [
            {
              text: 'back',
              action: tour.back,
            },
            {
              text: 'next',
              action: () => tour.next(),
            },
          ],
        },
        {
          id: 'how-it-works',
          text: 'Learn how our app works.',
          attachTo: { element: '.how-it-works', on: 'top' },
          buttons: [
            {
              text: 'back',
              action: tour.back,
            },
            {
              text: 'end',
              action: () => {
                scrollToTop();
                tour.complete();
              },
            },
          ],
        },
      ];
  }

  steps.forEach(step => tour.addStep(step));
  tour.start();
};

export default startTour;
