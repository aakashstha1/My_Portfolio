import PropTypes from "prop-types";
import {  motion } from "framer-motion";
function SectionTitle({ title }) {
  return (
    <div className="flex gap-10 items-center py-10">
      <motion.h1
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="text-4xl text-white font-semibold"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ x: 90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
        className="w-60 h-[1px] bg-silver"
      ></motion.div>
    </div>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
