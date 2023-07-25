import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../apiKey";
import SemiCircleChart from "../ui/SemiCircleChart";
import Footer from "../ui/Footer";

// specific styles for this Component
import styles from "./UserProfilePage.module.css";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const [value, onChange] = useState(new Date());

  console.log(value);

  // const onChange = () => {};

  useEffect(() => {
    console.log("fetch");
    const fetchUserData = async () => {
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/api/users/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const userData = response.data;
          setUser(userData);
          console.log("user: ", user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      {user ? (
        <div className={styles.userPageWrapper}>
          <h2 className="textCenter colorRed">
            Welcome back, {user.firstName}!
          </h2>
          <div className={`cardContainer ${styles.balanceContainer}`}>
            <div className={styles.balanceContainer}>
              <span>
                <b>Account balance:</b>
              </span>
              <span>{user.account.balance} $</span>
            </div>
          </div>
          <div className="cardContainer" style={{ padding: "25px" }}>
            <SemiCircleChart min={0} max={1000} value={750} />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quis
            assumenda distinctio commodi facilis optio quisquam delectus quasi
            odit fuga similique nostrum tempora culpa ea modi non ratione labore
            soluta nulla aperiam reiciendis. Veniam optio blanditiis a nihil
            provident nemo id, ipsam magni ullam dignissimos quam itaque nobis
            ea dolore facilis necessitatibus doloremque laboriosam quaerat quos
            praesentium minima consequatur. Voluptate, rem. Veniam aspernatur
            distinctio dolore corporis, quam eos id at quisquam accusantium nisi
            doloribus dolor dignissimos quasi inventore sit neque debitis sequi
            dicta ducimus non pariatur est! Quas debitis recusandae cumque
            illum, et cum dolorem magni, esse, nesciunt porro neque dignissimos
            necessitatibus commodi tenetur qui nobis ea enim ducimus dolorum
            similique repellendus labore nostrum natus libero. Consequatur sed
            maxime laboriosam exercitationem, accusantium expedita praesentium
            nulla corrupti commodi doloribus nisi doloremque molestiae, tempore
            minus! Sapiente quaerat quos adipisci ipsum animi qui doloremque
            harum. Incidunt enim amet at provident consectetur, veniam sed minus
            molestiae rerum esse error impedit sapiente beatae ex iure, adipisci
            sint rem repellendus atque possimus vitae quia. Itaque, aliquam
            mollitia. Dolorum voluptatem est explicabo ut et debitis quaerat
            repudiandae. Similique error pariatur cupiditate nemo sit dicta
            perspiciatis unde a necessitatibus. Quisquam, esse sequi eius
            voluptas tempora harum sunt, eaque sapiente tenetur quidem maiores
            iusto. In aspernatur, aliquam, nemo deleniti sed perferendis
            repellendus incidunt error explicabo, dolorum iure reprehenderit
            voluptatibus illum. Nesciunt, dignissimos, doloribus fugiat culpa
            provident quam laboriosam fugit velit aliquam sapiente aut sunt
            excepturi hic dolores accusantium sint libero animi ut
            necessitatibus assumenda a! Laborum nisi a fugiat mollitia, id
            molestias aperiam dignissimos? Repellat itaque minima quisquam
            repellendus expedita perspiciatis reiciendis quam ut qui eaque ipsam
            saepe placeat deserunt exercitationem labore nobis dicta similique,
            minus tenetur dolorem, corporis doloremque. Voluptates perferendis
            delectus rem quasi praesentium inventore dolorem nesciunt tenetur,
            quam necessitatibus a, recusandae iusto aut fugiat, commodi dolor!
            Impedit, doloribus accusamus neque delectus, nesciunt hic sint
            laudantium molestiae fugit itaque ratione commodi ipsam corporis
            tenetur magni omnis exercitationem blanditiis ab quod ducimus.
            Voluptates culpa cupiditate dolorum officiis, velit quis fuga dicta
            rerum corporis nobis repudiandae tenetur hic labore quaerat iste
            sunt natus ipsa nemo dignissimos. Doloribus reprehenderit
            dignissimos hic ad ipsa? Explicabo, illo velit veniam voluptates
            consequuntur id dolorem facere vitae ducimus ratione neque similique
            eum blanditiis beatae quos aperiam magnam fuga suscipit omnis illum
            soluta. Possimus reiciendis placeat eos ratione molestias quis vel
            voluptatum maiores. Maxime nulla repudiandae corporis placeat
            impedit! Aspernatur, dolores omnis. Animi, sit quis!
          </p>

          <Footer />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
