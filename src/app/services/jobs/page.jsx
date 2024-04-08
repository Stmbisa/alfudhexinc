import JobCard from "@/components/jobCard/jobCard";
import styles from "./jobs.module.css";

const fetchJobs = async () => {
  const res = await fetch(`${process.env.DOMAIN}/api/jobs`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};

const JobsPage = async () => {
  const jobs = await fetchJobs();

  return (
    <div className={styles.container}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobsPage;