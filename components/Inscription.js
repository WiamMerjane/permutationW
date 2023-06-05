import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Inscription = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [grade, setGrade] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [faculteActuelle, setFaculteActuelle] = useState('');
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [password, setPassword] = useState('');

  const handleInscription = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nom,
          prenom,
          tel,
          grade,
          specialite,
          faculteActuelle,
          villeFaculteActuelle,
          villeDesiree,
          password,
        }),
      });

      const data = await response.json();

      // Traitez ici la réponse de l'API selon vos besoins

      // Réinitialisez les champs du formulaire après l'inscription réussie
      setEmail('');
      setNom('');
      setPrenom('');
      setTel('');
      setGrade('');
      setSpecialite('');
      setFaculteActuelle('');
      setVilleFaculteActuelle('');
      setVilleDesiree('');
      setPassword('');

      // Redirigez l'utilisateur vers une autre page après l'inscription réussie
      navigation.navigate('Accueil');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={prenom}
            onChangeText={setPrenom}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            value={tel}
            onChangeText={setTel}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="graduation-cap" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="briefcase" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Spécialité"
            value={specialite}
            onChangeText={setSpecialite}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="university" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Faculté actuelle"
            value={faculteActuelle}
            onChangeText={setFaculteActuelle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ville de la faculté actuelle"
            value={villeFaculteActuelle}
            onChangeText={setVilleFaculteActuelle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ville désirée"
            value={villeDesiree}
            onChangeText={setVilleDesiree}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button title="S'inscrire" onPress={handleInscription} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Inscription;
