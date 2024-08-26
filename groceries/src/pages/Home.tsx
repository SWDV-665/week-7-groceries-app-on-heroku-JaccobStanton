import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonToast,
} from "@ionic/react";
import { add, trash, create, share } from "ionicons/icons";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Tab1: React.FC = () => {
  const [groceries, setGroceries] = useState([
    { name: "Apples", quantity: 10 },
    { name: "Milk", quantity: 14 },
    { name: "Cucumbers", quantity: 5 },
    { name: "Chips and Salsa", quantity: 1 },
    { name: "Ice Cream", quantity: 1 },
  ]);
  const [newGrocery, setNewGrocery] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: CustomEvent) => {
    setNewGrocery((e.target as HTMLInputElement).value);
  };

  const handleQuantityChange = (e: CustomEvent) => {
    setNewQuantity(parseInt((e.target as HTMLInputElement).value));
  };

  const addGrocery = () => {
    if (newGrocery.trim() !== "") {
      if (editingIndex !== null) {
        const updatedGroceries = [...groceries];
        updatedGroceries[editingIndex] = {
          name: newGrocery,
          quantity: newQuantity,
        };
        setGroceries(updatedGroceries);
        setEditingIndex(null);
      } else {
        setGroceries([
          ...groceries,
          { name: newGrocery, quantity: newQuantity },
        ]);
      }
      setNewGrocery("");
      setNewQuantity(1);
      setShowInput(false);
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const deleteGrocery = (index: number) => {
    const newGroceries = [...groceries];
    newGroceries.splice(index, 1);
    setGroceries(newGroceries);
  };

  const editGrocery = (index: number) => {
    setNewGrocery(groceries[index].name);
    setNewQuantity(groceries[index].quantity);
    setEditingIndex(index);
    setShowInput(true);
  };

  const shareGrocery = (index: number) => {
    const grocery = groceries[index];
    const message = `Grocery: ${grocery.name}, Quantity: ${grocery.quantity}`;
    SocialSharing.share(message)
      .then(() => {
        setShowToast(true);
      })
      .catch((error) => {
        console.error("Error sharing", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Groceries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Home page" />
        <IonList>
          {groceries.map((grocery, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonLabel>{grocery.name}</IonLabel>
                <h2>Quantity: {grocery.quantity}</h2>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="primary"
                  onClick={() => editGrocery(index)}
                >
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => deleteGrocery(index)}
                >
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
                <IonItemOption
                  color="secondary"
                  onClick={() => shareGrocery(index)}
                >
                  <IonIcon slot="icon-only" icon={share} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        {showInput && (
          <IonItem>
            <IonInput
              placeholder="Enter Grocery"
              value={newGrocery}
              onIonChange={handleInputChange}
            />
            <IonInput
              type="number"
              placeholder="Enter Quantity"
              value={newQuantity}
              onIonChange={handleQuantityChange}
            />
            <IonButton onClick={addGrocery}>
              {editingIndex !== null ? "Update" : "Add"}
            </IonButton>
          </IonItem>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={toggleInput}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Grocery shared successfully!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
