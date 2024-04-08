import Image from "next/image";
import styles from "./jobCard.module.css";
import Link from "next/link";

const JobCard = ({ job }) => {
  const { title, description, category, location, estimatedAmount, slug } = job;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* Render job image or placeholder */}
        <div className={styles.imgContainer}>
          <Image
            src={job.image || "/placeholder.jpg"}
            alt={title}
            fill
            className={styles.img}
          />
        </div>
        <span className={styles.date}>
          {job.createdAt?.toString().slice(4, 16)}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{description}</p>
        <p className={styles.category}>Category: {category.name}</p>
        <p className={styles.location}>Location: {location}</p>
        {estimatedAmount && (
          <p className={styles.amount}>Estimated Amount: ${estimatedAmount}</p>
        )}
        <div className={styles.buttonContainer}>
          <Link href={`/jobs/${slug}`} className={styles.button}>
            View Details
          </Link>
          <button className={styles.button}>Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;