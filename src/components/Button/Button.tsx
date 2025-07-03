import Link from 'next/link';
import React from 'react';
import * as Fa from 'react-icons/fa';
import styles from './Button.module.scss';

export interface ButtonProps {
  label: string;
  href?: string;
  icon?: keyof typeof Fa;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<Readonly<ButtonProps>> = ({
  label,
  href,
  icon,
  onClick,
}) => {
  const IconComponent = icon ? Fa[icon] : null;
  const buttonContent = (
    <>
      {IconComponent && <IconComponent />}
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles.button}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles.button}>
      {buttonContent}
    </button>
  );
};
