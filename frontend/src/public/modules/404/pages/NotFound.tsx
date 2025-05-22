import Background from '../components/Background/Background';
import NotFoundContent from '../components/NotFoundContent/NotFoundContent';
import BenchLamp from '../components/BenchLamp/BenchLamp';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.pageWrapper}>
        <Background />
        <div className={styles.container}>
            <div className={styles.leftSection}>
            <NotFoundContent />
            </div>
            <div className={styles.rightSection}>
            <BenchLamp />
            </div>
        </div>
        </div>
    );
};

export default NotFound;