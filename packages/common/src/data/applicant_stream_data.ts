export type Stream = Record<
  string,
  { name: string; specialties: Record<string, Specialty> | null }
>;
export type Specialty = { name: string; subSpecialties: SubSpecialty };
export type SubSpecialty = Record<string, { name: string }> | null;

export const streamData: Stream = {
  AlliedHealthProfessional: {
    name: 'Allied Health Professional',
    specialties: {
      AnesthesiaAssistant: {
        name: 'Anesthesia Assistant',
        subSpecialties: null,
      },
      CardiovascularPerfusionist: {
        name: 'Cardiovascular Perfusionist',
        subSpecialties: null,
      },
      ClinicalCounsellor: {
        name: 'Clinical Counsellor',
        subSpecialties: null,
      },
      DiagnosticMedicalSonographer: {
        name: 'Diagnostic Medical Sonographer',
        subSpecialties: null,
      },
      ExercisePhysiologist: {
        name: 'Exercise Physiologist',
        subSpecialties: null,
      },
      MagneticResonanceImagingTechnologistMRITech: {
        name: 'Magnetic Resonance Imaging Technologist (MRI Tech)',
        subSpecialties: null,
      },
      MedicalLaboratoryAssistant: {
        name: 'Medical Laboratory Assistant',
        subSpecialties: null,
      },
      MedicalLaboratoryTechnologist: {
        name: 'Medical Laboratory Technologist',
        subSpecialties: null,
      },
      OccupationalTherapist: {
        name: 'Occupational Therapist',
        subSpecialties: null,
      },
      Physiotherapist: {
        name: 'Physiotherapist',
        subSpecialties: null,
      },
      Psychologist: {
        name: 'Psychologist',
        subSpecialties: null,
      },
      RecreationTherapist: {
        name: 'Recreation Therapist',
        subSpecialties: null,
      },
      RegisteredDietician: {
        name: 'Registered Dietician',
        subSpecialties: null,
      },
      RehabAssistant: {
        name: 'Rehab Assistant',
        subSpecialties: null,
      },
      RespiratoryTherapist: {
        name: 'Respiratory Therapist',
        subSpecialties: null,
      },
      SocialWorker: {
        name: 'Social Worker',
        subSpecialties: null,
      },
      SpeechLanguagePathologist: {
        name: 'Speech Language Pathologist',
        subSpecialties: null,
      },
    },
  },
  DentalProfessional: {
    name: 'Dental Professional',
    specialties: {
      DentalHygienist: {
        name: 'Dental Hygienist',
        subSpecialties: null,
      },
      DentalTherapist: {
        name: 'Dental Therapist',
        subSpecialties: null,
      },
      Dentist: {
        name: 'Dentist',
        subSpecialties: null,
      },
    },
  },
  EmergencyResponder: {
    name: 'Emergency Responder',
    specialties: {
      AdvancedCareParamedic: {
        name: 'Advanced Care Paramedic',
        subSpecialties: null,
      },
      CommunityParamedic: {
        name: 'Community Paramedic',
        subSpecialties: null,
      },
      CriticalCareParamedic: {
        name: 'Critical Care Paramedic',
        subSpecialties: null,
      },
      Firefighter: {
        name: 'Firefighter',
        subSpecialties: null,
      },
      PrimaryCareParamedic: {
        name: 'Primary Care Paramedic',
        subSpecialties: null,
      },
    },
  },
  HealthCareAssistant: {
    name: 'Health Care Assistant',
    specialties: {
      Acute: {
        name: 'Acute',
        subSpecialties: null,
      },
      AssistedLiving: {
        name: 'Assisted Living',
        subSpecialties: null,
      },
      HomeSupport: {
        name: 'Home Support',
        subSpecialties: null,
      },
      LongTermCare: {
        name: 'Long Term Care',
        subSpecialties: null,
      },
      Palliative: {
        name: 'Palliative',
        subSpecialties: null,
      },
      PrivateHome: {
        name: 'Private Home',
        subSpecialties: null,
      },
      SelfEmployed: {
        name: 'Self-Employed',
        subSpecialties: null,
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
        subSpecialties: {
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
        subSpecialties: {
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
        subSpecialties: {
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
        subSpecialties: {
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
        subSpecialties: {
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
        subSpecialties: null,
      },
      PharmacyTech: {
        name: 'Pharmacy Tech',
        subSpecialties: null,
      },
    },
  },
  Physician: {
    name: 'Physician',
    specialties: {
      Anaesthesiology: {
        name: 'Anaesthesiology',
        subSpecialties: null,
      },
      Cardiology: {
        name: 'Cardiology',
        subSpecialties: null,
      },
      ClinicalImmunologyAllergy: {
        name: 'Clinical Immunology & Allergy',
        subSpecialties: null,
      },
      ClinicalPharmacologyToxicology: {
        name: 'Clinical Pharmacology & Toxicology',
        subSpecialties: null,
      },
      ClinicianInvestigatorProgram: {
        name: 'Clinician Investigator Program',
        subSpecialties: null,
      },
      Dermatology: {
        name: 'Dermatology',
        subSpecialties: null,
      },
      EligibleInternationalMedicalGraduate: {
        name: 'Eligible International Medical Graduate',
        subSpecialties: null,
      },
      EndocrinologyMetabolism: {
        name: 'Endocrinology & Metabolism',
        subSpecialties: null,
      },
      FamilyPhysician: {
        name: 'Family Physician',
        subSpecialties: null,
      },
      Gastroenterology: {
        name: 'Gastroenterology',
        subSpecialties: null,
      },
      GynecologicReproductiveEndocrinologyInfertility: {
        name: 'Gynecologic Reproductive Endocrinology & Infertility',
        subSpecialties: null,
      },
      GynecologyObstetrics: {
        name: 'Gynecology & Obstetrics',
        subSpecialties: null,
      },
      Hematology: {
        name: 'Hematology',
        subSpecialties: null,
      },
      InfectiousDiseases: {
        name: 'Infectious Diseases',
        subSpecialties: null,
      },
      Medicine: {
        name: 'Medicine',
        subSpecialties: {
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
        subSpecialties: null,
      },
      Nephrology: {
        name: 'Nephrology',
        subSpecialties: null,
      },
      Neurology: {
        name: 'Neurology',
        subSpecialties: null,
      },
      Oncology: {
        name: 'Oncology',
        subSpecialties: null,
      },
      Ophthalmology: {
        name: 'Ophthalmology',
        subSpecialties: null,
      },
      Pathology: {
        name: 'Pathology',
        subSpecialties: {
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
        subSpecialties: null,
      },
      Psychiatry: {
        name: 'Psychiatry',
        subSpecialties: {
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
        subSpecialties: {
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
        subSpecialties: null,
      },
      Respirology: {
        name: 'Respirology',
        subSpecialties: null,
      },
      Rheumatology: {
        name: 'Rheumatology',
        subSpecialties: null,
      },
      Surgery: {
        name: 'Surgery',
        subSpecialties: {
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
        subSpecialties: null,
      },
      Urology: {
        name: 'Urology',
        subSpecialties: null,
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
        subSpecialties: null,
      },
      LicensedPracticalNursestudent: {
        name: 'Licensed Practical Nurse student',
        subSpecialties: null,
      },
      Medicalstudent: {
        name: 'Medical student',
        subSpecialties: null,
      },
      Midwiferystudent: {
        name: 'Midwifery student',
        subSpecialties: null,
      },
      Pharmacystudent: {
        name: 'Pharmacy student',
        subSpecialties: null,
      },
      RegisteredNursestudent: {
        name: 'Registered Nurse student',
        subSpecialties: null,
      },
      RegisteredPsychiatricNursestudent: {
        name: 'Registered Psychiatric Nurse student',
        subSpecialties: null,
      },
    },
  },
};
