/**
 * Non-translatable data for each course/certification. The description lives
 * in the dictionaries under `certifications.items[id]`.
 */
export type CertificationConfig = {
  id: string;
  issuer: string;
  /** Two letters shown in the badge next to the issuer. */
  initials: string;
  title: string;
  date: string;
  /** Link to the credential. Omit it and the "view" link is hidden. */
  url?: string;
};

export const certifications: CertificationConfig[] = [
  {
    id: "php-master",
    issuer: "Udemy",
    initials: "UD",
    title: "Master en PHP, SQL, POO, MVC, Laravel, Symfony, WordPress",
    date: "2023",
    url: "https://www.udemy.com/certificate/UC-34bc8706-6348-4a1c-82a8-dd4b212679d6/",
  },
  {
    id: "js-master",
    issuer: "Udemy",
    initials: "UD",
    title: "Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS",
    date: "2023",
    url: "https://www.udemy.com/certificate/UC-a02c43fd-40c7-4807-947e-9bfb8a11e23d/",
  },
  {
    id: "vue-advanced",
    issuer: "LinkedIn Learning",
    initials: "LI",
    title: "Vue Avanzado 1",
    date: "2026",
    url: "https://www.linkedin.com/learning/certificates/87ed3a2b001dcacc48b3883eaf93139c5f7e898e92bc6a7a05c331d8603e247d?trk=share_certificate",
  },
];
