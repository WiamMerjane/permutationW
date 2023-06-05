import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profil = ({ loggedInUser }) => {
  const [modifiedUser, setModifiedUser] = useState(loggedInUser);

  const handleInputChange = (field, value) => {
    setModifiedUser({ ...modifiedUser, [field]: value });
  };

  const handleSaveChanges = async () => {
  try {
    // Récupérer l'utilisateur à partir de l'e-mail
    const response = await fetch(
      `https://troubled-red-garb.cyclic.app/professeurs?email=${loggedInUser.email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      // Récupération réussie
      const users = await response.json();
      if (users.length > 0) {
        const user = users[0];

        // Mettre à jour les champs modifiés
        const updatedUser = { ...user, ...modifiedUser };

        // Effectuer la requête PUT pour enregistrer les modifications
        const putResponse = await fetch(
          `https://troubled-red-garb.cyclic.app/professeurs?email=${loggedInUser.email}`,
          {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(modifiedUser),
  }
);

        if (putResponse.ok) {
          // Mise à jour réussie
          setModifiedUser(updatedUser);
          Alert.alert('Succès', 'Les modifications ont été enregistrées avec succès');
        } else {
          // Erreur lors de la mise à jour
          Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sauvegarde des modifications');
        }
      } else {
        // Aucun utilisateur trouvé avec l'e-mail donné
        Alert.alert('Erreur', 'Aucun utilisateur trouvé avec cet e-mail');
      }
    } else {
      // Erreur lors de la récupération de l'utilisateur
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération de l\'utilisateur');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données:', error);
    Alert.alert('Erreur', 'Une erreur s\'est produite lors de la mise à jour des données');
  }
};


const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `https://troubled-red-garb.cyclic.app/professeurs/${loggedInUser.email}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        // Suppression réussie
        Alert.alert('Succès', 'Le compte a été supprimé avec succès');
        // Réinitialiser les données de l'utilisateur
        setModifiedUser({});
      } else {
        // Erreur lors de la suppression du compte
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression du compte');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression du compte');
    }
  };


  if (!loggedInUser) {
    return null;
  }

  return (
    <ScrollView>
      <View>
        <Text>Nom:</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.nom}
            onChangeText={(value) => handleInputChange('nom', value)}
          />
        </View>

        <Text>Prénom:</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.prenom}
            onChangeText={(value) => handleInputChange('prenom', value)}
          />
        </View>

        <Text>Téléphone:</Text>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.tel}
            onChangeText={(value) => handleInputChange('tel', value)}
          />
        </View>

        <Text>Grade:</Text>
        <View style={styles.inputContainer}>
          <Icon name="graduation-cap" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.grade}
            onChangeText={(value) => handleInputChange('grade', value)}
          />
        </View>

        <Text>Spécialité:</Text>
        <View style={styles.inputContainer}>
          <Icon name="flask" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.specialite}
            onChangeText={(value) => handleInputChange('specialite', value)}
          />
        </View>

        <Text>Faculté actuelle:</Text>
        <View style={styles.inputContainer}>
          <Icon name="university" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.faculteActuelle}
            onChangeText={(value) => handleInputChange('faculteActuelle', value)}
          />
        </View>

        <Text>Ville de la faculté actuelle:</Text>
        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.villeFaculteActuelle}
            onChangeText={(value) => handleInputChange('villeFaculteActuelle', value)}
          />
        </View>

        <Text>Ville désirée:</Text>
        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="#000" />
          <TextInput
            style={styles.input}
            value={modifiedUser.villeDesiree}
            onChangeText={(value) => handleInputChange('villeDesiree', value)}
          />
        </View>

        <Button title="Enregistrer les modifications" onPress={handleSaveChanges} />
         <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>Supprimer le compte</Text>
        </TouchableOpacity>
      
      </View>
    </ScrollView>
  );
};

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
   deleteButton: {
      backgroundColor: 'red',
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
};

export default Profil;
