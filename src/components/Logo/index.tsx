import { TimerIcon } from 'lucide-react';
import { RouterLink } from '../RouterLinks';
import styles from './styles.module.css';

function Logo() {
    return <div className={styles.logo}>
        <RouterLink href="/" className={styles.logoLink}>
            <TimerIcon />
            <span>Chronos</span>
        </RouterLink>
    </div>;
}

export { Logo };