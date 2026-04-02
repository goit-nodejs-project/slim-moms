import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <CalculatorCalorieForm />
      </main>
      <RightSideBar />
    </div>
  );
};

export default CalculatorPage;
