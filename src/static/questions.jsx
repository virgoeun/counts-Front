import { formTypes } from "../components/FeedbackForm//DailyForm";

const companyName = "Daily Log";

const questions = [
  {
    field: "date", 
    submitButtonText: "Next",
    type: formTypes.text, // You can use a text input for the date
    question: `Date (e.g., YYYY-MM-DD):`, // You can customize the question as needed
    required: true,
    pattern: "\\d{4}-\\d{2}-\\d{2}" 
  },
  {
    field: "sports.durationInMinutes",
    options: ["+3 hours", "+2 hours", "+1 hour", "+30 minutes", "+20 minutes", "<10 minutes!😎"],
    submitButtonText: "Next",
    type: formTypes.dropdown,
    question: `How many minutes did you spend on sports activity today?`,
    required: true
  },
  {
    field: "sports.level",
    options: ["High-Intensity 🥵", "Mid-Intensity 😊", "Mild 😌"],
    submitButtonText: "Next",
    type: formTypes.dropdown,
    question: `What was the intensity level of your sports activity?`,
    required: true
  },
  {
    field: "sports.type",
    options: [
      "Yoga/Pilates",
      "Weight Training",
      "Crossfit",
      "Walk",
      "Water Sports",
      "Winter Sports",
      "Stretching",
      "Run",
      "Cycle",
      "Hiking",
      "Bouldering",
      "Boxing",
      "Others"
    ],
    submitButtonText: "Next",
    type: formTypes.dropdown,
    question: `What type of sports activity did you engage in?`,
    required: true
  },
  {
    field: "sports.description",
    submitButtonText: "Next",
    type: formTypes.text,
    question: `Please provide a description of your sports activity (optional)`,
    required: false
  },
  {
    field: "sleep.durationInHours",
    options: ["+8 hours", "+7 hours", "+6 hours", "+4~5 hours", "I need Sleep! 😪"], 
    submitButtonText: "Next",
    type: formTypes.dropdown,
    question: `How many hours did you sleep last night?`,
    required: true
  },
  // Add questions for other fields like water, stress, etc.
  {
    field: "water",
    options: ["+3l 💧💧💧 ", "+2l 💧💧", "+1l 💧", "+0.5l 💦"],
    submitButtonText: "Next",
    type: formTypes.dropdown,
    question: `How much water did you drink today?`,
    required: true
  },
  {
    field: "stress",
    options: ["Burned-out🤯", "Middle", "Low", "No Stress!🥰"],
    submitButtonText: "Next",
    type: formTypes.dropdown,
    question: `How would you rate your stress level today?`,
    required: true
  },
  {
    field: "note",
    submitButtonText: "Submit",
    type: formTypes.text,
    question: `Please record any extra logs here!`,
    required: true
  }
];

export { companyName, questions };
