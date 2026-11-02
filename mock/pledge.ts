// "Commit to serve" pledge — the counter starts from this base; new pledges on the page add to it locally.
export const pledge = {
  base: 48_215,
  goal: 100_000,
  goalBy: "the Civic Centre’s opening in 2027",
  commitments: [
    { id: "hours", label: "Give 20 hours of service in my community this year" },
    { id: "vote", label: "Register to vote — and help one friend register" },
    { id: "mentor", label: "Mentor a young person for at least a year" },
    { id: "townhall", label: "Attend a town hall or ward meeting" },
    { id: "project", label: "Start or join a community project" },
  ],
  recent: [
    { name: "Chiamaka", place: "Enugu", commitment: "Mentor a young person", when: "2 min ago" },
    { name: "Yusuf", place: "Kano", commitment: "Register to vote", when: "6 min ago" },
    { name: "Efe", place: "Warri", commitment: "Attend a town hall", when: "11 min ago" },
    { name: "Bukola", place: "Ibadan", commitment: "Give 20 hours of service", when: "18 min ago" },
    { name: "Nnamdi", place: "London", commitment: "Mentor a young person", when: "24 min ago" },
    { name: "Hauwa", place: "Abuja", commitment: "Start a community project", when: "31 min ago" },
  ],
  chapters: [
    { city: "Enugu", members: 9_420 },
    { city: "Lagos", members: 8_960 },
    { city: "Abuja", members: 6_310 },
    { city: "Kano", members: 5_140 },
    { city: "Port Harcourt", members: 3_880 },
    { city: "Ibadan", members: 3_260 },
    { city: "Diaspora", members: 4_105 },
  ],
};
