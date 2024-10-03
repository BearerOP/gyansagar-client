import { motion } from "framer-motion";
import { Clock, Award, Book, Users } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Learning",
    description: "Learn at your own pace, anytime and anywhere.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals and thought leaders.",
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Comprehensive Curriculum",
    description: "Well-structured courses covering both theory and practical applications.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Support",
    description: "Engage with peers and instructors in our vibrant learning community.",
  },
];

export default function Benefits() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Why Learn With Us</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}