import React from "react";
import styles from "./creditscoreadvice.module.css";

function CreditScoreAdvice({ creditScore }) {
  const lowScoreAdvice = (
    <div className={styles.containerAdvice}>
      <h3>You have a low credit score</h3>
      <p>
        If your credit score is very low, here are three steps you can take to
        improve it:
      </p>
      <div className={styles.advice}>
        Pay Off Past Due Balances: Start by addressing any past due balances or
        defaulted accounts. Contact your creditors to negotiate payment plans or
        settlements if necessary.
      </div>

      <div className={styles.advice}>
        Use Secured Credit Cards Responsibly: Consider applying for a secured
        credit card. With a secured card, you'll need to make a deposit as
        collateral, and your credit limit will typically be equal to the deposit
        amount.
      </div>
      <div className={styles.advice}>
        Check and Correct Errors on Your Credit Report: Obtain a free copy of
        your credit report from each of the major credit bureaus (Equifax,
        Experian, and TransUnion) and review them for errors. Dispute any
      </div>
    </div>
  );

  const mediumScoreAdvice = (
    <div className={styles.containerAdvice}>
      <h3>You have a medium credit score</h3>
      <p>
        If your credit score is in the medium range, you are on the right track
        but there is still room for improvement. Here are some tips to continue
        building a stronger credit profile:
      </p>
      <div className={styles.advice}>
        Continue Making Timely Payments: Keep up with your bill payments and
        avoid late payments. Consistent on-time payments have a positive impact
        on your credit score.
      </div>
      <div className={styles.advice}>
        Down Debt: Aim to reduce your credit card balances and other outstanding
        debts. Lowering your credit utilization can lead to an improvement in
        your credit score.
      </div>
      <div className={styles.advice}>
        Avoid Opening Too Many New Credit Accounts: Opening multiple new credit
        accounts within a short period may negatively affect your credit score.
        Only apply for new credit when necessary.
      </div>
    </div>
  );

  const highScoreAdvice = (
    <div className={styles.containerAdvice}>
      <h3>You have a high credit score</h3>
      <p>
        Congratulations on having a high credit score! To maintain your
        excellent credit profile, consider the following steps:
      </p>
      <div className={styles.advice}>
        Continue Good Credit Habits: Keep up with your responsible credit
        habits, such as making on-time payments and keeping credit card balances
        low.
      </div>
      <div className={styles.advice}>
        Monitor Your Credit: Regularly check your credit reports to ensure their
        accuracy and detect any potential issues early on.
      </div>
      <div className={styles.advice}>
        Be Cautious with Credit Applications: Even though you have a high credit
        score, avoid opening too many new credit accounts. Each credit inquiry
        can have a temporary impact on your score.
      </div>
    </div>
  );

  return (
    <div>
      {creditScore < 600
        ? lowScoreAdvice
        : creditScore < 800
        ? mediumScoreAdvice
        : highScoreAdvice}
    </div>
  );
}

export default CreditScoreAdvice;
