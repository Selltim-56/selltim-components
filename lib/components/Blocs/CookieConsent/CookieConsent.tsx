/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import '../../../style.css';

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as VanillaCookieConsent from "vanilla-cookieconsent";
import { useEffect } from "react";
import { CookieIcon } from "@sidekickicons/react/24/outline";
import React from 'react';

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

export type CookieConsentProps = {
  /**
   * Method to send a Google Analytics event.
   *
   * @example
   * ```
   * import { sendGAEvent } from "@next/third-parties/google";
   `
   * @param _args
   */
  sendGAEvent: (..._args: Object[]) => void;

  /**
   * Endpoint to log the cookie consent.
   *
   */
  endpoint: string;

  /**
   * Color of the button.
   *
   */
  color: string;
}

/**
 * Cookie consent component.
 *
 * @param sendGAEvent
 * @param endpoint
 * @param color
 * @constructor
 */
const CookieConsent = ({ sendGAEvent, endpoint, color }: CookieConsentProps) => {
  useEffect(() => {
    sendGAEvent('consent', 'default', {
      [SERVICE_AD_STORAGE]: 'denied',
      [SERVICE_AD_USER_DATA]: 'denied',
      [SERVICE_AD_PERSONALIZATION]: 'denied',
      [SERVICE_ANALYTICS_STORAGE]: 'denied',
      [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
      [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
      [SERVICE_SECURITY_STORAGE]: 'denied',
    });

    function updateGtagConsent() {
      sendGAEvent('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: VanillaCookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
        [SERVICE_AD_STORAGE]: VanillaCookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_USER_DATA]: VanillaCookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_PERSONALIZATION]: VanillaCookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_FUNCTIONALITY_STORAGE]: VanillaCookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_PERSONALIZATION_STORAGE]: VanillaCookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_SECURITY_STORAGE]: VanillaCookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
      });
    }

    async function logConsent() {
      const cookie = VanillaCookieConsent.getCookie();
      const preferences = VanillaCookieConsent.getUserPreferences();

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          consentId: cookie.consentId,
          consentTimestamp: cookie.consentTimestamp,
          languageCode: cookie.languageCode,
          lastConsentTimestamp: cookie.lastConsentTimestamp,
          acceptType: preferences.acceptType,
          acceptedCategories: preferences.acceptedCategories,
          rejectedCategories: preferences.rejectedCategories,
        })
      })
        .then(async response => {
          if (response.ok) {
            console.log('Cookie consent logged.')
          } else {
            console.error('Something went wrong while logging cookie consent : ', await response.json())
          }
        })
        .catch(e => console.error('Failed logging cookie consent', e));
    }

    VanillaCookieConsent.run({
      onFirstConsent: () => {
        updateGtagConsent();
        logConsent();
      },
      onConsent: () => {
        updateGtagConsent();
      },
      onChange: () => {
        updateGtagConsent();
        logConsent();
      },
      guiOptions: {
        consentModal: {
          layout: 'bar',
          position: 'bottom right',
          flipButtons: false,
          equalWeightButtons: true
        },
        preferencesModal: {
          layout: 'box',
          flipButtons: false,
          equalWeightButtons: true
        },
      },
      categories: {
        [CAT_NECESSARY]: {
          enabled: true,
          readOnly: true,
        },
        [CAT_ANALYTICS]: {
          autoClear: {
            cookies: [
              {
                name: /^_ga/,
              },
              {
                name: '_gid',
              }
            ]
          },
          services: {
            [SERVICE_ANALYTICS_STORAGE]: {
              label: 'Active le stockage (comme les cookies) lié aux analyses, ex. la durée des visites',
            }
          }
        },
        [CAT_ADVERTISEMENT]: {
          services: {
            [SERVICE_AD_STORAGE]: {
              label: 'Active le stockage (comme les cookies) lié à la publicité',
            },
            [SERVICE_AD_USER_DATA]: {
              label: 'Définit le consentement pour l\'envoi de données utilisateur liées à la publicité à Google.',
            },
            [SERVICE_AD_PERSONALIZATION]: {
              label: 'Définit le consentement pour la publicité personnalisée.',
            },
          }
        },
        [CAT_FUNCTIONALITY]: {
          services: {
            [SERVICE_FUNCTIONALITY_STORAGE]: {
              label: 'Active le stockage qui prend en charge les fonctionnalités du site web ou de l\'application, par exemple les paramètres de langue.',
            },
            [SERVICE_PERSONALIZATION_STORAGE]: {
              label: 'Active le stockage lié à la personnalisation, par exemple les recommandations de vidéos.',
            },
          }
        },
        [CAT_SECURITY]: {
          services: {
            [SERVICE_SECURITY_STORAGE]: {
              label: 'Active le stockage lié à la sécurité, comme l\'authentification, la prévention de la fraude et la protection des utilisateurs.',
            },
          }
        }
      },

      language: {
        default: 'fr',
        translations: {
          fr: {
            consentModal: {
              title: 'Nous utilisons des cookies',
              description: 'Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi pour comprendre comment vous interagissez avec lui. Ces derniers ne seront activés qu\'après consentement.',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              showPreferencesBtn: 'Gérer les préférences individuelles'
            },
            preferencesModal: {
              title: 'Centre de préférences de consentement',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              savePreferencesBtn: 'Accepter la sélection actuelle',
              closeIconLabel: 'Fermer la fenêtre',
              sections: [
                {
                  title: "Utilisation des cookies",
                  description: "Nous utilisons des cookies pour assurer les fonctionnalités de base du site web et améliorer votre expérience en ligne."
                },
                {
                  title: "Cookies strictement nécessaires",
                  description: "Ces cookies sont essentiels au bon fonctionnement du site web, par exemple pour l'authentification des utilisateurs.",
                  linkedCategory: CAT_NECESSARY,
                },
                {
                  title: "Analytique",
                  description: 'Les cookies utilisés à des fins d\'analyse aident à collecter des données permettant aux services de comprendre comment les utilisateurs interagissent avec un service particulier. Ces informations permettent d\'améliorer le contenu et de développer des fonctionnalités qui optimisent l\'expérience utilisateur.',
                  linkedCategory: CAT_ANALYTICS,
                  cookieTable: {
                    headers: {
                      name: "Nom",
                      domain: "Service",
                      description: "Description",
                      expiration: "Expiration"
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: "Google Analytics",
                        description: "Cookie défini par <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                        expiration: "Expire après 12 jours"
                      },
                      {
                        name: "_gid",
                        domain: "Google Analytics",
                        description: "Cookie défini par <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                        expiration: "Session"
                      }
                    ]
                  }
                },
                {
                  title: 'Publicité',
                  description: 'Google utilise des cookies à des fins publicitaires, notamment pour diffuser et afficher des annonces, personnaliser les annonces (en fonction de vos paramètres de publicité sur <a href="https://g.co/adsettings">g.co/adsettings</a>), limiter le nombre d&apos;affichages d&apos;une annonce, désactiver les annonces que vous ne souhaitez plus voir et mesurer l&apos;efficacité des annonces.',
                  linkedCategory: CAT_ADVERTISEMENT,
                },
                {
                  title: 'Fonctionnalité',
                  description: 'Les cookies utilisés pour les fonctionnalités permettent aux utilisateurs d\'interagir avec un service ou un site afin d\'accéder à des fonctionnalités essentielles. Cela inclut des préférences comme le choix de la langue, les optimisations de produit pour maintenir et améliorer un service, et la conservation d\'informations relatives à la session d\'un utilisateur, comme le contenu d\'un panier d\'achat.',
                  linkedCategory: CAT_FUNCTIONALITY,
                },
                {
                  title: 'Sécurité',
                  description: 'Les cookies utilisés pour la sécurité authentifient les utilisateurs, préviennent la fraude et protègent les utilisateurs lorsqu\'ils interagissent avec un service.',
                  linkedCategory: CAT_SECURITY,
                },
                {
                  title: 'Plus d\'informations',
                  description: 'Pour toute question concernant la politique sur les cookies et vos choix, veuillez <a href="/contact">nous contacter</a>.'
                }
              ]
            }
          }
        }
      }
    });
  }, [endpoint, sendGAEvent]);

  return (
    <React.Fragment>
      <style>{`
        #cc-main {
          --cc-btn-primary-bg: ${color};
          --cc-btn-primary-border-color: ${color};
          --cc-btn-primary-hover-bg: #444444;
          --cc-btn-primary-hover-border-color: #444444;
        }
      `}</style>
      <button style={{ backgroundColor: color }} className="fixed z-50 bottom-5 left-5 rounded-full p-2 shadow-lg hover:scale-105 duration-500 cursor-pointer" type="button" data-cc="show-preferencesModal">
        <CookieIcon className="h-6 w-6" color="white" />
      </button>
    </React.Fragment>
  );
};

export default CookieConsent;
