import styles from "./page.module.css";

export default function ConnectWalletPage() {
  return (
    <div>
      <div className={styles.gradient}></div>
      <p
        style={{
          position: "absolute",
          zIndex: "1",
        }}
      >
        Connect Wallet
      </p>
    </div>
  );
}
