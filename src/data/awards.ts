export interface AwardBranch {
  branch: string
  badges: string[]
  ribbons: string[]
}

export const awards: AwardBranch[] = [
  {
    branch: 'USAR',
    badges: [
      'Special Operations Diver',
      '1ID, SOAR, JFK, ASF CSIB',
      'Basic Military Freefall Badge',
      'Army Pathfinder Badge',
      'Ranger Tab',
      'Master Parachutist Badge',
      'Expert Marksman Qualification Badge',
      '3 Overseas Bars',
      'Army Air Assault Badge',
      'Basic Parachutist Badge',
      'Combat Action Badge',
      'Combat Infantryman Badge ×2',
      'Joint Chiefs of Staff Identification Badge',
      'Headquarters Identification Badge',
      'Gold Aiguillette',
    ],
    ribbons: [
      'Antarctica Service',
      'National Defense Service',
      'Global War on Terrorism',
      'NCO Professional Development',
      'Army Service',
    ],
  },
  {
    branch: 'USAF',
    badges: [
      'Pilot Wings — Master',
      'Air Crew Wings — Senior',
      'Joint Chiefs of Staff Identification Badge',
      'Headquarters US Air Force Badge',
      "Commander's Insignia",
      'Gold Aiguillette',
      'Driver W',
    ],
    ribbons: [
      'Air Force Combat Action Ribbon',
      'Armed Forces Expeditionary Medal',
      'Global War on Terrorism Expeditionary',
      'Armed Forces Service',
      'Air Force Overseas Ribbon',
      'Defense Distinguished Service',
      'Silver Star',
      'Legion of Merit — Commander',
      "Airman's Medal",
      'Air Force Commendation',
      'Air Force Good Conduct ×2',
      'Outstanding Volunteer Service',
      'Afghanistan Campaign',
      'Air Force Longevity Service ×2',
      'Outstanding Airman Award',
    ],
  },
]
