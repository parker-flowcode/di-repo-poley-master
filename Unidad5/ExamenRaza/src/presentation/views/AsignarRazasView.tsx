import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { Raza } from '../../domain/entities/Raza';
import { AnimalConColor } from '../models/AnimalConColor';
import { AnimalesViewModel } from '../viewModels/AnimalesViewModel';

function fechaLegible(fecha: Date): string {
  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AsignarRazasView() {
  const [viewModel] = useState(() => container.get<AnimalesViewModel>(TYPES.AnimalesViewModel));
  const [animalActivo, setAnimalActivo] = useState<number | null>(null);
  const [, actualizarVista] = useState(0);

  const elegirRaza = (raza: Raza) => {
    if (animalActivo !== null) {
      viewModel.seleccionarRaza(animalActivo, raza.idRaza);
      actualizarVista((version) => version + 1);
    }
    setAnimalActivo(null);
  };

  const guardar = () => {
    viewModel.actualizarRazas();
    actualizarVista((version) => version + 1);
  };

  const renderAnimal = ({ item }: { item: AnimalConColor }) => {
    const raza = viewModel.razas.find((itemRaza) => itemRaza.idRaza === item.idRazaSeleccionada);

    return (
      <View style={[styles.animalRow, { backgroundColor: item.colorFondo }]}>
        <View style={styles.animalInfo}>
          <Text style={styles.animalName}>{item.nombreAnimal}</Text>
          <Text style={styles.animalSex}>{item.sexo}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Elegir raza para ${item.nombreAnimal}`}
          onPress={() => setAnimalActivo(item.idAnimal)}
          style={({ pressed }) => [styles.selectButton, pressed && styles.pressed]}
        >
          <Text numberOfLines={1} style={styles.selectText}>
            {raza?.nombre ?? 'Elegir raza'}
          </Text>
          <Text style={styles.selectArrow}>⌄</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CORTIJO · RECEPCIÓN</Text>
          <Text style={styles.title}>Clasificar caballos</Text>
          <Text style={styles.date}>{fechaLegible(viewModel.fecha)}</Text>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Llegadas de hoy</Text>
          <Text style={styles.count}>{viewModel.listadoAnimalConColor.length} ANIMALES</Text>
        </View>

        <FlatList
          data={viewModel.listadoAnimalConColor}
          keyExtractor={(item) => String(item.idAnimal)}
          renderItem={renderAnimal}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
          ListEmptyComponent={(
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Todo clasificado</Text>
              <Text style={styles.emptyText}>No quedan animales pendientes para hoy.</Text>
            </View>
          )}
        />

        <View style={styles.footer}>
          <Text accessibilityLiveRegion="polite" style={styles.feedback}>
            {viewModel.mensaje}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={guardar}
            style={({ pressed }) => [styles.saveButton, pressed && styles.savePressed]}
          >
            <Text style={styles.saveButtonText}>Guardar asignaciones</Text>
          </Pressable>
          <Text style={styles.updatedCount}>
            Actualizados en esta operación: {viewModel.numActualizaciones}
          </Text>
        </View>
      </View>

      <Modal
        visible={animalActivo !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setAnimalActivo(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setAnimalActivo(null)}>
          <Pressable style={styles.modalPanel} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalEyebrow}>SELECCIÓN</Text>
            <Text style={styles.modalTitle}>Elige una raza</Text>
            {viewModel.razas.map((raza) => (
              <Pressable
                key={raza.idRaza}
                accessibilityRole="button"
                onPress={() => elegirRaza(raza)}
                style={({ pressed }) => [styles.breedOption, pressed && styles.breedPressed]}
              >
                <Text style={styles.breedName}>{raza.nombre}</Text>
                <Text style={styles.breedCode}>{String(raza.idRaza).padStart(2, '0')}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setAnimalActivo(null)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f4ed',
  },
  screen: {
    flex: 1,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 22,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8ce',
  },
  eyebrow: {
    color: '#66764e',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    marginTop: 10,
    color: '#20291f',
    fontSize: 30,
    fontWeight: '800',
  },
  date: {
    marginTop: 6,
    color: '#666c5f',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  listHeader: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#20291f',
    fontSize: 18,
    fontWeight: '700',
  },
  count: {
    color: '#66764e',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  animalRow: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#d9dedb',
    borderRadius: 6,
  },
  rowSeparator: {
    height: 8,
  },
  animalInfo: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  animalName: {
    color: '#20291f',
    fontSize: 16,
    fontWeight: '700',
  },
  animalSex: {
    marginTop: 4,
    color: '#686f63',
    fontSize: 12,
  },
  selectButton: {
    width: 168,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    backgroundColor: '#fffefa',
    borderWidth: 1,
    borderColor: '#aeb8a5',
    borderRadius: 5,
  },
  selectText: {
    flex: 1,
    color: '#33402f',
    fontSize: 12,
    fontWeight: '600',
  },
  selectArrow: {
    marginLeft: 8,
    color: '#66764e',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.72,
  },
  emptyState: {
    flex: 1,
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#20291f',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 8,
    color: '#666c5f',
    fontSize: 13,
    textAlign: 'center',
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#d8d8ce',
  },
  feedback: {
    marginBottom: 10,
    color: '#526247',
    fontSize: 13,
  },
  saveButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#536b45',
    borderRadius: 5,
  },
  savePressed: {
    backgroundColor: '#3e5333',
  },
  saveButtonText: {
    color: '#fffefa',
    fontSize: 15,
    fontWeight: '700',
  },
  updatedCount: {
    marginTop: 9,
    color: '#777b70',
    fontSize: 11,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(27, 35, 27, 0.42)',
  },
  modalPanel: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 30,
    backgroundColor: '#f9f8f2',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalEyebrow: {
    color: '#66764e',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modalTitle: {
    marginTop: 7,
    marginBottom: 12,
    color: '#20291f',
    fontSize: 22,
    fontWeight: '800',
  },
  breedOption: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e2d9',
  },
  breedPressed: {
    backgroundColor: '#ecefe5',
  },
  breedName: {
    flex: 1,
    color: '#303a2c',
    fontSize: 14,
  },
  breedCode: {
    color: '#758169',
    fontSize: 11,
    fontWeight: '700',
  },
  cancelButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#66764e',
    fontSize: 14,
    fontWeight: '700',
  },
});