import { MarketoForm } from "../types/marketo";

// Constants
const DS_INVALID_FORMS = [1908];
const ZI_DEBUG = false;
const SRPRO_VERSION = "1.0.0";
const ZI_ENRICHED_FIELDS = {
  ZI_First_Name__c: "FirstName",
  ZI_Last_Name__c: "LastName",
  ZI_Mobile_Phone__c: "Phone",
  ZI_Company_Name__c: "Company",
  ZI_Job_Title__c: "Title",
  ZI_Country_Code__c: "Country",
  zIContactState: "State",
};
const ZI_PASSING_SCORE = 90;
const ZI_INVALID_DOMAINS = [
  "@blueyonder.co.uk",
  "@ameritech.net",
  "@att.net",
  "@bellsouth.net",
  "@currently.com",
  "@flash.net",
  "@nvbell.net",
  "@pacebell.net",
  "@prodigy.com",
  "@sbcglobal.net",
  "@snet.net",
  "@swbell.com",
  "@wans.net",
  "@comcast.net",
  "@cox.net",
  "@facebook.com",
  "@gmail",
  "@gmail.com",
  "@hotmail.",
  "@hotmail.be",
  "@hotmail.co.uk",
  "@hotmail.com",
  "@hotmail.com.ar",
  "@hotmail.com.mx",
  "@hotmail.de",
  "@hotmail.es",
  "@hotmail.fr",
  "@inbox.com",
  "@list.ru",
  "@mac.com",
  "@outlook.",
  "@protonmail.",
  "@t-online.de",
  "@verizon.net",
  "@yahoo.",
  "@yahoo.co.id",
  "@yahoo.co.in",
  "@yahoo.co.jp",
  "@yahoo.co.kr",
  "@yahoo.co.uk",
  "@yahoo.com. ph",
  "@yahoo.com.ar",
  "@yahoo.com.mx",
  "@yahoo.com.sg",
  "@yahoo.de",
  "@yahoo.es",
  "@yahoo.fr",
  "@yahoo.in",
  "@zoho.com",
  "gmai.com",
  "gmail.cm",
  "gmail.con",
  "hotmail.se",
  "@126.",
  "@163.com",
  "@arnet.com.ar",
  "@BigString.com",
  "@Boarderemail.com",
  "@boardermail.com",
  "@btinternet.com",
  "@Care2.com",
  "@charter.net",
  "@daum.net",
  "@DBZMail.com",
  "@DCEmail.com",
  "@DidaMail.com",
  "@earthlink.net",
  "@email.com",
  "@EmailAccount.com",
  "@Fastermail",
  "@fastmail.fm",
  "@fibertel.com.ar",
  "@flight.be",
  "@free.fr",
  "@games.com",
  "@gmx.com",
  "@gmx.de",
  "@gmx.fr",
  "@gmx.net",
  "@googlemail.",
  "@googlemail. com",
  "@hanmail.net",
  "@hush.com",
  "@hushmail.com",
  "@icloud.",
  "@juno.com",
  "@laposte.net",
  "@lavabit.com",
  "@orange.fr",
  "@orange.net",
  "@qq.com",
  "@reddiffmail.",
  "@rocketmail.com",
  "@wanadoo.co.uk",
  "@wanadoo.fr",
  "@30Gigs.com",
  "@Bluebottle.com",
  "@Canada.com",
  "@freeserve.co.uk",
  "AIM Mail",
  "Aussie Mail",
  "@live.",
  "@live.be",
  "@live.cn",
  "@live.co.uk",
  "@live.com",
  "@live.com.ar",
  "@live.com.mx",
  "@live.de",
  "@live.fr",
  "@love.com",
  "@mail.com",
  "@mail.ru",
  "@mailinator.",
  "@me.com",
  "@msn .com",
  "@msn.com",
  "@nate.com",
  "@naver.com",
  "@neuf.fr",
  "@ntlworld.com",
  "@o2.co.uk",
  "@online.de",
  "@pobox.com",
  "@prodigy.net.mx",
  "@rambler.ru",
  "@safe-mail.net",
  "@sfr.fr",
  "@sina.com",
  "@sky.com",
  "@skynet.be",
  "@speedy.com.ar",
  "@sz-excel.com",
  "@talktalk.co.uk",
  "@telenet.be",
  "@test.",
  "@tiscali.co.uk",
  "@tvcablenet.be",
  "@ukr.net",
  "@virgin.net",
  "@virginmedia.com",
  "@web.de",
  "@wow.com",
  "@ya.ru",
  "@yandex.",
  "@yandex.ru",
  "@ygm.com",
  "@ymail.com",
  "@yopmail.",
  "@gmail.",
  "@yahoo.",
  "@hotmail.",
  "@live.",
  "@aol.",
  "@outlook.",
  "@fireeye.",
  "@attackiq.",
  "@email.com",
  "@cymulate.com",
  "@verodin.com",
];
const ZI_COUNTRY_STATES: Record<string, string[]> = {
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia",
    "American Samoa",
    "Guam",
    "Northern Mariana Islands",
    "Puerto Rico",
    "United States Minor Outlying Islands",
    "Virgin Islands, U.S.",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],
};
export const MARKETO_EXCLUDED_FROM_VALIDATION = [
  "CampaignID__c",
  "Campaign_Medium__c",
  "Campaign_Offer_Code__c",
  "Campaign_Source__c",
  "Campaign_Term__c",
  "Clearbit_Enriched_At__c",
  "Clearbit_Status__c",
  "Digital_ID__c",
  "GCLID__c",
  "Journey__c",
  "Offer__c",
  "Referrer_URL__c",
  "ZI_Company_Name__c",
  "ZI_Country_Code__c",
  "ZI_First_Name__c",
  "ZI_Job_Title__c",
  "ZI_Last_Name__c",
  "ZI_Mobile_Phone__c",
  "clearbitFormStatus",
  "formid",
  "honeybot",
  "munchkinId",
  "zIContactAccuracyScore",
  "zIContactState",
  // "Phone",
  // "tempComments",
];

// Helper functions
const _debug = (...args: any) => {
  if (ZI_DEBUG) {
    console.log(...args);
  }
};

/**
 * Debounce function
 *
 */
const debounce = (
  func: (...args: any) => void,
  wait: number
): ((...args: any) => void) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if email is good and not from invalid domains
 *
 * @param {string} email - Email address
 * @returns {boolean}
 */
export const isEmailGood = (email: string): boolean => {
  const domain = email.split("@")[1];
  return !ZI_INVALID_DOMAINS.includes(`@${domain}`);
};

/**
 * Set the enriched attribute
 *
 * @param {string} formElId - Marketo form element ID
 */
const addTagToMktForm = (formElId: string) => {
  const formEl = document.getElementById(formElId);
  formEl?.setAttribute("mkt-form-identifier", "srpro-enriched");
};

/**
 * Check if the form is already enriched with this script
 *
 * @param {string} formElId - Marketo form element ID
 * @returns {boolean}
 */
const checkIfFormIsEnriched = (formElId: string): boolean => {
  const formEl = document.getElementById(formElId);
  return formEl?.getAttribute("mkt-form-identifier") === "srpro-enriched";
};

/**
 * Listen to the Country field changes
 *
 * @param {string} formElId - Marketo form element ID
 */
const onCountryChangeListener = (formElId: string) => {
  const countryField = document.querySelector<HTMLSelectElement>(
    `#${formElId} select[name="Country"]`
  );

  if (countryField) {
    countryField.addEventListener(
      "change",
      debounce(() => {
        const country = countryField.value;
        setCountryStates(country, formElId);
      }, 500)
    );
  }
};

/**
 * Set the state based on Country and ZI accuracy score
 *
 * @param {string} country - Country name
 * @param {string} formElId - Marketo form element ID
 */
const setCountryStates = (country: string, formElId: string) => {
  const zIContactAccuracyScore =
    document.querySelector<HTMLInputElement>(
      `#${formElId} input[name="zIContactAccuracyScore"]`
    )?.valueAsNumber || 0;
  const ziStateValue =
    document.querySelector<HTMLInputElement>(
      `#${formElId} input[name="zIContactState"]`
    )?.value || "";

  if (ZI_COUNTRY_STATES[country]) {
    _debug("Setting states for country", country);
    const states = ZI_COUNTRY_STATES[country];
    const stateField = document.querySelector<HTMLSelectElement>(
      `#${formElId} select[name="State"]`
    );

    if (stateField) {
      stateField.options.length = 0;
      stateField.options.add(
        new Option("Please select State/Province", "", true, true)
      );

      states.forEach((state) => {
        let isSelected = false;

        if (
          zIContactAccuracyScore >= ZI_PASSING_SCORE &&
          ziStateValue === state
        ) {
          isSelected = true;
        }

        stateField.options.add(
          new Option(state, state, isSelected, isSelected)
        );
      });
    }
  }
};

/**
 * Listen to the ZI score changes
 *
 * @param {string} formElId - Marketo form element ID
 * @param {MarketoForm} form - Marketo form instance
 */
const ziScoreListener = (formElId: string, form: MarketoForm) => {
  const emailField = document.querySelector<HTMLInputElement>(
    `#${formElId} input[name="Email"]`
  );

  const processForm = () => {
    const fields_value: Record<string, string | number> = {};

    const zIContactAccuracyScore =
      document.querySelector<HTMLInputElement>(
        `#${formElId} input[name="zIContactAccuracyScore"]`
      )?.valueAsNumber || 0;

    _debug("ZI score - ", zIContactAccuracyScore);

    Object.entries(ZI_ENRICHED_FIELDS).forEach(([ziField, formField]) => {
      _debug(`ziField - ${ziField}, formField - ${formField}`);
      const ziFieldEl = document.querySelector<HTMLInputElement>(
        `#${formElId} input[name="${ziField}"]`
      );
      const formFieldEl = document.querySelector<HTMLInputElement>(
        `#${formElId} input[name="${formField}"]`
      );

      if (!ziFieldEl || !formFieldEl) {
        return;
      }

      const ziFieldValue = ziFieldEl.value;
      const formFieldValue = formFieldEl.value;

      _debug(
        `ziFieldValue - ${ziFieldValue}, formFieldValue - ${formFieldValue}`
      );

      if (zIContactAccuracyScore >= ZI_PASSING_SCORE) {
        _debug("ZI score passed");

        if (ziFieldValue) {
          // If ZI field value is not empty, set the value to be filled
          fields_value[formField] = ziFieldValue;
          return;
        }
      }

      // If ZI Score didn't pass, do not update the field values
      _debug("ZI score didn't pass");
    });

    // set field value
    form.vals(fields_value);
  };

  if (emailField) {
    emailField.addEventListener("keyup", debounce(processForm, 1000));
  }
};

// Initialization
export const loadZiEnrichment = (form: MarketoForm) => {
  if (DS_INVALID_FORMS.includes(form.getId())) {
    return;
  }

  const formElId = `mktoForm_${form.getId()}`;

  // show script version
  _debug(`mkto script version - ${SRPRO_VERSION}, form - ${form.getId()}`);

  if (!checkIfFormIsEnriched(formElId)) {
    // set this form as enriched
    addTagToMktForm(formElId);
    onCountryChangeListener(formElId);
    ziScoreListener(formElId, form);
  }
};

export const setBusinessEmailValidation = (form: MarketoForm) => {
  form.onValidate(function () {
    const vals = form.vals();

    if (vals.Email && !isEmailGood(vals.Email)) {
      form.submittable(false);

      const emailElem = form.getFormElem().find("#Email");
      form.showErrorMessage("Please enter a business email.", emailElem);
      return;
    }

    form.submittable(true);
  });
};

export const addHiddenFields = (form: MarketoForm) => {
  form.addHiddenFields({
    Referrer_URL__c: document.referrer.length > 0 ? document.referrer : "NULL",
    referrer: document.referrer.length > 0 ? document.referrer : "NULL",
  });
};

export const reorderFields = (form: MarketoForm) => {
  const formEl = form.getFormElem();
  const rows = formEl.find(".mktoFormRow, .mktoButtonRow");
  const customKeys: Record<string, number> = {
    Email: 1,
    FirstName: 2,
    LastName: 3,
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const input = row.querySelector("input, select, textarea, button");
    if (input) {
      const key = customKeys[input.name] || i + 1;
      input.setAttribute("tabindex", key);
    }
  }
};

export const isFormSubmittable = (
  values: Record<string, any>,
  requiredFields: string[] = []
) => {
  let isValid = true;

  Object.entries(values).forEach(([key, value]) => {
    if (value === "" && requiredFields?.includes(key)) {
      isValid = false;
    }
  });

  return isValid;
};
