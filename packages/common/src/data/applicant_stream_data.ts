export type Stream = Record<
  string,
  { name: string; specialties: Record<string, Specialty> | null }
>;
export type Specialty = { name: string; subspecialties: Subspecialty };
export type Subspecialty = Record<string, { name: string }> | null;

export const streamData: Stream = {
  AlliedHealthProfessional: {
    name: 'Allied Health Professional',
    specialties: {
      AnesthesiaAssistant: {
        name: 'Anesthesia Assistant',
        subspecialties: null,
      },
      CardiovascularPerfusionist: {
        name: 'Cardiovascular Perfusionist',
        subspecialties: null,
      },
      ClinicalCounsellor: {
        name: 'Clinical Counsellor',
        subspecialties: null,
      },
      DiagnosticMedicalSonographer: {
        name: 'Diagnostic Medical Sonographer',
        subspecialties: null,
      },
      ExercisePhysiologist: {
        name: 'Exercise Physiologist',
        subspecialties: null,
      },
      MagneticResonanceImagingTechnologistMRITech: {
        name: 'Magnetic Resonance Imaging Technologist (MRI Tech)',
        subspecialties: null,
      },
      MedicalLaboratoryAssistant: {
        name: 'Medical Laboratory Assistant',
        subspecialties: null,
      },
      MedicalLaboratoryTechnologist: {
        name: 'Medical Laboratory Technologist',
        subspecialties: null,
      },
      OccupationalTherapist: {
        name: 'Occupational Therapist',
        subspecialties: null,
      },
      Physiotherapist: {
        name: 'Physiotherapist',
        subspecialties: null,
      },
      Psychologist: {
        name: 'Psychologist',
        subspecialties: null,
      },
      RecreationTherapist: {
        name: 'Recreation Therapist',
        subspecialties: null,
      },
      RegisteredDietician: {
        name: 'Registered Dietician',
        subspecialties: null,
      },
      RehabAssistant: {
        name: 'Rehab Assistant',
        subspecialties: null,
      },
      RespiratoryTherapist: {
        name: 'Respiratory Therapist',
        subspecialties: null,
      },
      SocialWorker: {
        name: 'Social Worker',
        subspecialties: null,
      },
      SpeechLanguagePathologist: {
        name: 'Speech Language Pathologist',
        subspecialties: null,
      },
    },
  },
  DentalProfessional: {
    name: 'Dental Professional',
    specialties: {
      DentalHygienist: {
        name: 'Dental Hygienist',
        subspecialties: null,
      },
      DentalTherapist: {
        name: 'Dental Therapist',
        subspecialties: null,
      },
      Dentist: {
        name: 'Dentist',
        subspecialties: null,
      },
    },
  },
  EmergencyResponder: {
    name: 'Emergency Responder',
    specialties: {
      AdvancedCareParamedic: {
        name: 'Advanced Care Paramedic',
        subspecialties: null,
      },
      CommunityParamedic: {
        name: 'Community Paramedic',
        subspecialties: null,
      },
      CriticalCareParamedic: {
        name: 'Critical Care Paramedic',
        subspecialties: null,
      },
      Firefighter: {
        name: 'Firefighter',
        subspecialties: null,
      },
      PrimaryCareParamedic: {
        name: 'Primary Care Paramedic',
        subspecialties: null,
      },
    },
  },
  HealthCareAssistant: {
    name: 'Health Care Assistant',
    specialties: {
      Acute: {
        name: 'Acute',
        subspecialties: null,
      },
      AssistedLiving: {
        name: 'Assisted Living',
        subspecialties: null,
      },
      HomeSupport: {
        name: 'Home Support',
        subspecialties: null,
      },
      LongTermCare: {
        name: 'Long Term Care',
        subspecialties: null,
      },
      Palliative: {
        name: 'Palliative',
        subspecialties: null,
      },
      PrivateHome: {
        name: 'Private Home',
        subspecialties: null,
      },
      SelfEmployed: {
        name: 'Self-Employed',
        subspecialties: null,
      },
    },
  },
  Midwife: {
    name: 'Midwife',
    specialties: null,
  },
  Naturopath: {
    name: 'Naturopath',
    specialties: null,
  },
  Nonclinical: {
    name: 'Non-clinical ',
    specialties: null,
  },
  Nurse: {
    name: 'Nurse',
    specialties: {
      ClinicalNurseEducators: {
        name: 'Clinical Nurse Educators',
        subspecialties: {
          CertifiedSTI: {
            name: 'Certified STI',
          },
          ChronicDiseaseManagement: {
            name: 'Chronic Disease Management',
          },
          CommunityHealth: {
            name: 'Community Health',
          },
          CriticalCareAdult: {
            name: 'Critical Care Adult',
          },
          CriticalCarePediatric: {
            name: 'Critical Care Pediatric',
          },
          EmergencyAdult: {
            name: 'Emergency Adult',
          },
          EmergencyPediatrics: {
            name: 'Emergency Pediatrics',
          },
          Gerontological: {
            name: 'Gerontological',
          },
          HighAcuity: {
            name: 'High Acuity',
          },
          HomeCare: {
            name: 'Home Care',
          },
          HospicePalliativeCare: {
            name: 'Hospice Palliative Care',
          },
          IENs: {
            name: 'IENs',
          },
          IntensiveCare: {
            name: 'Intensive Care',
          },
          LabourandDelivery: {
            name: 'Labour and Delivery',
          },
          LongTermCare: {
            name: 'Long Term Care',
          },
          MedicalSurgical: {
            name: 'Medical Surgical',
          },
          Neonatal: {
            name: 'Neonatal',
          },
          NeonatalIntensiveCare: {
            name: 'Neonatal Intensive Care',
          },
          Neuroscience: {
            name: 'Neuroscience',
          },
          NewGradNurse: {
            name: 'New Grad Nurse',
          },
          NursingManagement: {
            name: 'Nursing Management',
          },
          Obstetrics: {
            name: 'Obstetrics',
          },
          OccupationalHealth: {
            name: 'Occupational Health',
          },
          Oncology: {
            name: 'Oncology',
          },
          Orthopaedic: {
            name: 'Orthopaedic',
          },
          Pediatrics: {
            name: 'Pediatrics',
          },
          Perianesthesia: {
            name: 'Perianesthesia',
          },
          Perinatal: {
            name: 'Perinatal',
          },
          Perioperative: {
            name: 'Perioperative',
          },
          PrimaryCare: {
            name: 'Primary Care',
          },
          PsychiatricandMentalHealth: {
            name: 'Psychiatric and Mental Health',
          },
          PublicHealth: {
            name: 'Public Health',
          },
          Rehabilitation: {
            name: 'Rehabilitation',
          },
          Renal: {
            name: 'Renal',
          },
          RNFirstCall: {
            name: 'RN First Call',
          },
          RuralRemote: {
            name: 'Rural/Remote',
          },
          Wound: {
            name: '"Wound',
          },
        },
      },
      LicensedPracticalNurse: {
        name: 'Licensed Practical Nurse',
        subspecialties: {
          CertifiedSTI: {
            name: 'Certified STI',
          },
          ChronicDiseaseManagement: {
            name: 'Chronic Disease Management',
          },
          CommunityHealth: {
            name: 'Community Health',
          },
          CriticalCareAdult: {
            name: 'Critical Care Adult',
          },
          CriticalCarePediatric: {
            name: 'Critical Care Pediatric',
          },
          EmergencyAdult: {
            name: 'Emergency Adult',
          },
          EmergencyPediatrics: {
            name: 'Emergency Pediatrics',
          },
          Gerontological: {
            name: 'Gerontological',
          },
          HighAcuity: {
            name: 'High Acuity',
          },
          HomeCare: {
            name: 'Home Care',
          },
          HospicePalliativeCare: {
            name: 'Hospice Palliative Care',
          },
          IENs: {
            name: 'IENs',
          },
          IntensiveCare: {
            name: 'Intensive Care',
          },
          LabourandDelivery: {
            name: 'Labour and Delivery',
          },
          LongTermCare: {
            name: 'Long Term Care',
          },
          MedicalSurgical: {
            name: 'Medical Surgical',
          },
          Neonatal: {
            name: 'Neonatal',
          },
          NeonatalIntensiveCare: {
            name: 'Neonatal Intensive Care',
          },
          Nephrology: {
            name: 'Nephrology',
          },
          Neuroscience: {
            name: 'Neuroscience',
          },
          NewGradNurse: {
            name: 'New Grad Nurse',
          },
          NursingManagement: {
            name: 'Nursing Management',
          },
          Obstetrics: {
            name: 'Obstetrics',
          },
          OccupationalHealth: {
            name: 'Occupational Health',
          },
          Oncology: {
            name: 'Oncology',
          },
          Orthopaedic: {
            name: 'Orthopaedic',
          },
          Pediatrics: {
            name: 'Pediatrics',
          },
          Perianesthesia: {
            name: 'Perianesthesia',
          },
          Perinatal: {
            name: 'Perinatal',
          },
          Perioperative: {
            name: 'Perioperative',
          },
          PrimaryCare: {
            name: 'Primary Care',
          },
          PsychiatricandMentalHealth: {
            name: 'Psychiatric and Mental Health',
          },
          PublicHealth: {
            name: 'Public Health',
          },
          Rehabilitation: {
            name: 'Rehabilitation',
          },
          Renal: {
            name: 'Renal',
          },
          RNFirstCall: {
            name: 'RN First Call',
          },
          RuralRemote: {
            name: 'Rural/Remote',
          },
          Wound: {
            name: '"Wound',
          },
        },
      },
      NursePractitioner: {
        name: 'Nurse Practitioner',
        subspecialties: {
          Cardiovascular: {
            name: 'Cardiovascular',
          },
          CertifiedSTI: {
            name: 'Certified STI',
          },
          ChronicDiseaseManagement: {
            name: 'Chronic Disease Management',
          },
          CommunityHealth: {
            name: 'Community Health',
          },
          CriticalCareAdult: {
            name: 'Critical Care Adult',
          },
          CriticalCarePediatric: {
            name: 'Critical Care Pediatric',
          },
          EmergencyAdult: {
            name: 'Emergency Adult',
          },
          EmergencyPediatrics: {
            name: 'Emergency Pediatrics',
          },
          Family: {
            name: 'Family',
          },
          Gerontological: {
            name: 'Gerontological',
          },
          HighAcuity: {
            name: 'High Acuity',
          },
          HomeCare: {
            name: 'Home Care',
          },
          HospicePalliativeCare: {
            name: 'Hospice Palliative Care',
          },
          IENs: {
            name: 'IENs',
          },
          IntensiveCare: {
            name: 'Intensive Care',
          },
          LabourandDelivery: {
            name: 'Labour and Delivery',
          },
          LongTermCare: {
            name: 'Long Term Care',
          },
          MedicalSurgical: {
            name: 'Medical Surgical',
          },
          Neonatal: {
            name: 'Neonatal',
          },
          NeonatalIntensiveCare: {
            name: 'Neonatal Intensive Care',
          },
          Neuroscience: {
            name: 'Neuroscience',
          },
          NewGradNurse: {
            name: 'New Grad Nurse',
          },
          NursingManagement: {
            name: 'Nursing Management',
          },
          Obstetrics: {
            name: 'Obstetrics',
          },
          OccupationalHealth: {
            name: 'Occupational Health',
          },
          Oncology: {
            name: 'Oncology',
          },
          Orthopaedic: {
            name: 'Orthopaedic',
          },
          Pediatrics: {
            name: 'Pediatrics',
          },
          Perianesthesia: {
            name: 'Perianesthesia',
          },
          Perinatal: {
            name: 'Perinatal',
          },
          Perioperative: {
            name: 'Perioperative',
          },
          PrimaryCare: {
            name: 'Primary Care',
          },
          PsychiatricandMentalHealth: {
            name: 'Psychiatric and Mental Health',
          },
          PublicHealth: {
            name: 'Public Health',
          },
          Rehabilitation: {
            name: 'Rehabilitation',
          },
          Renal: {
            name: 'Renal',
          },
          RNFirstCall: {
            name: 'RN First Call',
          },
          RuralRemote: {
            name: 'Rural/Remote',
          },
          Wound: {
            name: '"Wound',
          },
        },
      },
      RegisteredNurse: {
        name: 'Registered Nurse',
        subspecialties: {
          CertifiedSTI: {
            name: 'Certified STI',
          },
          ChronicDiseaseManagement: {
            name: 'Chronic Disease Management',
          },
          CommunityHealth: {
            name: 'Community Health',
          },
          CriticalCareAdult: {
            name: 'Critical Care Adult',
          },
          CriticalCarePediatric: {
            name: 'Critical Care Pediatric',
          },
          EmergencyAdult: {
            name: 'Emergency Adult',
          },
          EmergencyPediatrics: {
            name: 'Emergency Pediatrics',
          },
          Gerontological: {
            name: 'Gerontological',
          },
          HighAcuity: {
            name: 'High Acuity',
          },
          HomeCare: {
            name: 'Home Care',
          },
          HospicePalliativeCare: {
            name: 'Hospice Palliative Care',
          },
          IENs: {
            name: 'IENs',
          },
          IntensiveCare: {
            name: 'Intensive Care',
          },
          LabourandDelivery: {
            name: 'Labour and Delivery',
          },
          LongTermCare: {
            name: 'Long Term Care',
          },
          MedicalSurgical: {
            name: 'Medical Surgical',
          },
          Neonatal: {
            name: 'Neonatal',
          },
          NeonatalIntensiveCare: {
            name: 'Neonatal Intensive Care',
          },
          Neuroscience: {
            name: 'Neuroscience',
          },
          NewGradNurse: {
            name: 'New Grad Nurse',
          },
          NursingManagement: {
            name: 'Nursing Management',
          },
          Obstetrics: {
            name: 'Obstetrics',
          },
          OccupationalHealth: {
            name: 'Occupational Health',
          },
          Oncology: {
            name: 'Oncology',
          },
          Orthopaedic: {
            name: 'Orthopaedic',
          },
          Pediatrics: {
            name: 'Pediatrics',
          },
          Perianesthesia: {
            name: 'Perianesthesia',
          },
          Perinatal: {
            name: 'Perinatal',
          },
          Perioperative: {
            name: 'Perioperative',
          },
          PrimaryCare: {
            name: 'Primary Care',
          },
          PsychiatricandMentalHealth: {
            name: 'Psychiatric and Mental Health',
          },
          PublicHealth: {
            name: 'Public Health',
          },
          Rehabilitation: {
            name: 'Rehabilitation',
          },
          Renal: {
            name: 'Renal',
          },
          RNFirstCall: {
            name: 'RN First Call',
          },
          RuralRemote: {
            name: 'Rural/Remote',
          },
          Wound: {
            name: '"Wound',
          },
        },
      },
      RegisteredPsychiatricNurse: {
        name: 'Registered Psychiatric Nurse',
        subspecialties: {
          CertifiedSTI: {
            name: 'Certified STI',
          },
          ChronicDiseaseManagement: {
            name: 'Chronic Disease Management',
          },
          CommunityHealth: {
            name: 'Community Health',
          },
          CriticalCareAdult: {
            name: 'Critical Care Adult',
          },
          CriticalCarePediatric: {
            name: 'Critical Care Pediatric',
          },
          EmergencyAdult: {
            name: 'Emergency Adult',
          },
          EmergencyPediatrics: {
            name: 'Emergency Pediatrics',
          },
          Gerontological: {
            name: 'Gerontological',
          },
          HighAcuity: {
            name: 'High Acuity',
          },
          HomeCare: {
            name: 'Home Care',
          },
          HospicePalliativeCare: {
            name: 'Hospice Palliative Care',
          },
          IENs: {
            name: 'IENs',
          },
          IntensiveCare: {
            name: 'Intensive Care',
          },
          LabourandDelivery: {
            name: 'Labour and Delivery',
          },
          LongTermCare: {
            name: 'Long Term Care',
          },
          MedicalSurgical: {
            name: 'Medical Surgical',
          },
          Neonatal: {
            name: 'Neonatal',
          },
          NeonatalIntensiveCare: {
            name: 'Neonatal Intensive Care',
          },
          Neuroscience: {
            name: 'Neuroscience',
          },
          NewGradNurse: {
            name: 'New Grad Nurse',
          },
          NursingManagement: {
            name: 'Nursing Management',
          },
          Obstetrics: {
            name: 'Obstetrics',
          },
          OccupationalHealth: {
            name: 'Occupational Health',
          },
          Oncology: {
            name: 'Oncology',
          },
          Orthopaedic: {
            name: 'Orthopaedic',
          },
          Pediatrics: {
            name: 'Pediatrics',
          },
          Perianesthesia: {
            name: 'Perianesthesia',
          },
          Perinatal: {
            name: 'Perinatal',
          },
          Perioperative: {
            name: 'Perioperative',
          },
          PrimaryCare: {
            name: 'Primary Care',
          },
          PsychiatricandMentalHealth: {
            name: 'Psychiatric and Mental Health',
          },
          PublicHealth: {
            name: 'Public Health',
          },
          Rehabilitation: {
            name: 'Rehabilitation',
          },
          Renal: {
            name: 'Renal',
          },
          RNFirstCall: {
            name: 'RN First Call',
          },
          RuralRemote: {
            name: 'Rural/Remote',
          },
          Wound: {
            name: '"Wound',
          },
        },
      },
    },
  },
  Pharmacy: {
    name: 'Pharmacy',
    specialties: {
      Pharmacist: {
        name: 'Pharmacist',
        subspecialties: null,
      },
      PharmacyTech: {
        name: 'Pharmacy Tech',
        subspecialties: null,
      },
    },
  },
  Physician: {
    name: 'Physician',
    specialties: {
      Anaesthesiology: {
        name: 'Anaesthesiology',
        subspecialties: null,
      },
      Cardiology: {
        name: 'Cardiology',
        subspecialties: null,
      },
      ClinicalImmunologyAllergy: {
        name: 'Clinical Immunology & Allergy',
        subspecialties: null,
      },
      ClinicalPharmacologyToxicology: {
        name: 'Clinical Pharmacology & Toxicology',
        subspecialties: null,
      },
      ClinicianInvestigatorProgram: {
        name: 'Clinician Investigator Program',
        subspecialties: null,
      },
      Dermatology: {
        name: 'Dermatology',
        subspecialties: null,
      },
      EligibleInternationalMedicalGraduate: {
        name: 'Eligible International Medical Graduate',
        subspecialties: null,
      },
      EndocrinologyMetabolism: {
        name: 'Endocrinology & Metabolism',
        subspecialties: null,
      },
      FamilyPhysician: {
        name: 'Family Physician',
        subspecialties: null,
      },
      Gastroenterology: {
        name: 'Gastroenterology',
        subspecialties: null,
      },
      GynecologicReproductiveEndocrinologyInfertility: {
        name: 'Gynecologic Reproductive Endocrinology & Infertility',
        subspecialties: null,
      },
      GynecologyObstetrics: {
        name: 'Gynecology & Obstetrics',
        subspecialties: null,
      },
      Hematology: {
        name: 'Hematology',
        subspecialties: null,
      },
      InfectiousDiseases: {
        name: 'Infectious Diseases',
        subspecialties: null,
      },
      Medicine: {
        name: 'Medicine',
        subspecialties: {
          Biochemistry: {
            name: 'Biochemistry',
          },
          CriticalCare: {
            name: 'Critical Care',
          },
          Emergency: {
            name: 'Emergency',
          },
          GeneralInternalMedicine: {
            name: 'General Internal Medicine',
          },
          Genetics: {
            name: 'Genetics',
          },
          Geriatric: {
            name: 'Geriatric',
          },
          InfectiousDiseases: {
            name: 'Infectious Diseases',
          },
          MaternalFetal: {
            name: 'Maternal Fetal',
          },
          NeonatalPerinatal: {
            name: 'Neonatal Perinatal',
          },
          Nuclear: {
            name: 'Nuclear',
          },
          Occupational: {
            name: 'Occupational',
          },
          Pain: {
            name: 'Pain',
          },
          Palliative: {
            name: 'Palliative',
          },
          PhysicalMedicineRehabilitation: {
            name: 'Physical Medicine & Rehabilitation',
          },
          PublicHealthandPreventive: {
            name: 'Public Health and Preventive',
          },
          Respiratory: {
            name: 'Respiratory',
          },
        },
      },
      Microbiology: {
        name: 'Microbiology',
        subspecialties: null,
      },
      Nephrology: {
        name: 'Nephrology',
        subspecialties: null,
      },
      Neurology: {
        name: 'Neurology',
        subspecialties: null,
      },
      Oncology: {
        name: 'Oncology',
        subspecialties: null,
      },
      Ophthalmology: {
        name: 'Ophthalmology',
        subspecialties: null,
      },
      Pathology: {
        name: 'Pathology',
        subspecialties: {
          Forensic: {
            name: 'Forensic',
          },
          General: {
            name: 'General',
          },
          Hematological: {
            name: 'Hematological',
          },
          Neuro: {
            name: 'Neuro',
          },
        },
      },
      Pediatric: {
        name: 'Pediatric',
        subspecialties: null,
      },
      Psychiatry: {
        name: 'Psychiatry',
        subspecialties: {
          ChildAdolescent: {
            name: 'Child & Adolescent',
          },
          Forensic: {
            name: 'Forensic',
          },
          Geriatric: {
            name: 'Geriatric',
          },
        },
      },
      Radiology: {
        name: 'Radiology',
        subspecialties: {
          Interventional: {
            name: 'Interventional',
          },
          Neuroradiology: {
            name: 'Neuroradiology',
          },
          Pediatric: {
            name: 'Pediatric',
          },
          RadiationOncology: {
            name: 'Radiation Oncology',
          },
        },
      },
      Resident: {
        name: 'Resident',
        subspecialties: null,
      },
      Respirology: {
        name: 'Respirology',
        subspecialties: null,
      },
      Rheumatology: {
        name: 'Rheumatology',
        subspecialties: null,
      },
      Surgery: {
        name: 'Surgery',
        subspecialties: {
          Colorectal: {
            name: 'Colorectal',
          },
          EmergencyMedicine: {
            name: 'Emergency Medicine',
          },
          General: {
            name: 'General',
          },
          GeneralSurgicalOncology: {
            name: 'General Surgical Oncology',
          },
          Neuro: {
            name: 'Neuro',
          },
          Orthopedic: {
            name: 'Orthopedic',
          },
          OtolaryngologyHeadandNeck: {
            name: 'Otolaryngology - Head and Neck',
          },
          Pediatric: {
            name: 'Pediatric',
          },
          Plastic: {
            name: 'Plastic',
          },
          Thoracic: {
            name: 'Thoracic',
          },
          Vascular: {
            name: 'Vascular',
          },
        },
      },
      SurgicalFoundations: {
        name: 'Surgical Foundations',
        subspecialties: null,
      },
      Urology: {
        name: 'Urology',
        subspecialties: null,
      },
    },
  },
  Podiatrist: {
    name: 'Podiatrist',
    specialties: null,
  },
  Student: {
    name: 'Student',
    specialties: {
      EmployedStudentNurse: {
        name: 'Employed Student Nurse',
        subspecialties: null,
      },
      LicensedPracticalNursestudent: {
        name: 'Licensed Practical Nurse student',
        subspecialties: null,
      },
      Medicalstudent: {
        name: 'Medical student',
        subspecialties: null,
      },
      Midwiferystudent: {
        name: 'Midwifery student',
        subspecialties: null,
      },
      Pharmacystudent: {
        name: 'Pharmacy student',
        subspecialties: null,
      },
      RegisteredNursestudent: {
        name: 'Registered Nurse student',
        subspecialties: null,
      },
      RegisteredPsychiatricNursestudent: {
        name: 'Registered Psychiatric Nurse student',
        subspecialties: null,
      },
    },
  },
};
