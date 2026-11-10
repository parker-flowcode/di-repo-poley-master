import { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { container } from '../core/container';
import { TYPES } from '../core/types';
import { PersonaViewModel } from '../ViewModels/PersonaViewModel';
import { Persona } from '../Models/Entities/Persona';

export default function PeopleListView() {
  const { width } = useWindowDimensions();
  const compact = width < 600;
  const viewModel = useMemo(
    () => container.get<PersonaViewModel>(TYPES.PersonaViewModel),
    [],
  );
  const dayType = viewModel.diaEsPar ? 'par' : 'impar';
  const displayedGender = viewModel.diaEsPar ? 'Hombres' : 'Mujeres';
  const dateLabel = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace('.', '').toUpperCase();

  const renderItem = ({ item, index }: { item: Persona; index: number }) => (
    <View style={styles.personRow}>
      <Text style={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</Text>
      <View style={styles.personDetails}>
        <Text style={styles.personName}>{item.nombreCompleto}</Text>
        <Text style={styles.personMeta}>{item.dni} · {item.fechaNacimiento.toLocaleDateString('es-ES')}</Text>
      </View>
      <View style={[styles.genderMark, item.genero === 'Mujer' && styles.genderMarkWoman]}>
        <Text style={[styles.genderText, item.genero === 'Mujer' && styles.genderTextWoman]}>
          {item.genero === 'Hombre' ? 'H' : 'M'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentFrame}>
        <View style={[styles.header, compact && styles.headerCompact]}>
          <View style={styles.topRail}>
            <View style={styles.brandLockup}>
              <View style={styles.brandMark}><View style={styles.brandMarkInner} /></View>
              <Text style={styles.eyebrow}>NEXUS<Text style={styles.eyebrowMuted}> / PEOPLE INDEX</Text></Text>
            </View>
            <View style={styles.systemStatus}>
              <View style={styles.statusLight} />
              <Text style={styles.statusText}>SISTEMA ACTIVO</Text>
            </View>
          </View>

          <View style={[styles.hero, compact && styles.heroCompact]}>
            <View style={styles.titleBlock}>
              <Text style={styles.kicker}>DIRECTORIO DE PERSONAS</Text>
              <Text style={[styles.title, compact && styles.titleCompact]}>Listado diario</Text>
            </View>
            <View style={styles.totalBlock}>
              <Text style={styles.totalNumber}>{String(viewModel.personas.length).padStart(2, '0')}</Text>
              <Text style={styles.totalLabel}>REGISTROS</Text>
            </View>
          </View>

          <View style={styles.summaryBand}>
            <View style={styles.cycleMarker}>
              <Text style={styles.cycleNumber}>{new Date().getDate().toString().padStart(2, '0')}</Text>
            </View>
            <View style={styles.summaryCopy}>
              <Text style={styles.summaryLabel}>{displayedGender.toUpperCase()}</Text>
              <Text style={styles.summaryMeta}>FILTRO DE DÍA {dayType.toUpperCase()}</Text>
            </View>
            <Text style={styles.dateLabel}>{dateLabel}</Text>
          </View>
        </View>

        <View style={styles.listHeading}>
          <Text style={styles.listHeadingText}>01 <Text style={styles.listHeadingMuted}>/ REGISTROS</Text></Text>
          <Text style={styles.listHeadingText}>ORDEN DNI ↑</Text>
        </View>

        {viewModel.isLoading ? (
          <ActivityIndicator style={styles.feedback} color="#d7ff70" />
        ) : viewModel.error ? (
          <Text style={styles.feedbackText}>{viewModel.error}</Text>
        ) : (
          <FlatList
            data={viewModel.personas}
            keyExtractor={(item) => item.dni}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={viewModel.personas.length ? styles.list : styles.emptyList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyCode}>NO DATA · 000</Text>
                <Text style={styles.emptyTitle}>El listado está vacío</Text>
                <Text style={styles.emptyDescription}>No hay personas para mostrar en esta prueba.</Text>
              </View>
            }
          />
        )}
        <View style={styles.footerRail}>
          <Text style={styles.footerText}>NEXUS DATABASE</Text>
          <Text style={styles.footerText}>END OF VIEW <Text style={styles.footerAccent}>■</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1110',
  },
  contentFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
    paddingHorizontal: 22,
  },
  header: {
    paddingTop: 20,
  },
  headerCompact: {
    paddingTop: 12,
  },
  topRail: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#26332f',
  },
  brandLockup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandMark: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    borderWidth: 1,
    borderColor: '#d7ff70',
    transform: [{ rotate: '45deg' }],
  },
  brandMarkInner: {
    width: 6,
    height: 6,
    backgroundColor: '#d7ff70',
  },
  eyebrow: {
    color: '#d7ff70',
    fontSize: 11,
    fontWeight: '800',
  },
  eyebrowMuted: {
    color: '#84928a',
    fontWeight: '500',
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLight: {
    width: 6,
    height: 6,
    marginRight: 7,
    backgroundColor: '#65e4d3',
  },
  statusText: {
    color: '#9eada5',
    fontSize: 9,
    fontWeight: '700',
  },
  hero: {
    minHeight: 142,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 14,
  },
  heroCompact: {
    minHeight: 120,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  kicker: {
    color: '#65e4d3',
    fontSize: 10,
    fontWeight: '700',
  },
  totalBlock: {
    minWidth: 78,
    alignItems: 'flex-end',
    paddingLeft: 12,
  },
  totalNumber: {
    color: '#d7ff70',
    fontSize: 39,
    fontWeight: '800',
    lineHeight: 44,
  },
  totalLabel: {
    color: '#84928a',
    fontSize: 9,
    fontWeight: '700',
  },
  title: {
    marginTop: 8,
    color: '#f1f5ee',
    fontSize: 38,
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 30,
  },
  summaryBand: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    backgroundColor: '#151f1c',
    borderLeftWidth: 3,
    borderLeftColor: '#d7ff70',
  },
  cycleMarker: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#34443d',
  },
  cycleNumber: {
    color: '#d7ff70',
    fontSize: 14,
    fontWeight: '800',
  },
  summaryCopy: {
    flex: 1,
  },
  summaryLabel: {
    color: '#f1f5ee',
    fontSize: 12,
    fontWeight: '800',
  },
  summaryMeta: {
    marginTop: 3,
    color: '#84928a',
    fontSize: 9,
    fontWeight: '700',
  },
  dateLabel: {
    color: '#65e4d3',
    fontSize: 10,
    fontWeight: '700',
  },
  listHeading: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#26332f',
  },
  listHeadingText: {
    color: '#65e4d3',
    fontSize: 9,
    fontWeight: '800',
  },
  listHeadingMuted: {
    color: '#84928a',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 16,
  },
  personRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#26332f',
  },
  rowIndex: {
    width: 42,
    color: '#71817a',
    fontSize: 11,
    fontWeight: '700',
  },
  personDetails: {
    flex: 1,
    minWidth: 0,
  },
  personName: {
    color: '#f1f5ee',
    fontSize: 15,
    fontWeight: '700',
  },
  personMeta: {
    marginTop: 4,
    color: '#84928a',
    fontSize: 11,
  },
  genderMark: {
    minWidth: 34,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: '#4b6348',
  },
  genderText: {
    color: '#d7ff70',
    fontSize: 9,
    fontWeight: '700',
  },
  genderMarkWoman: {
    borderColor: '#547f7a',
  },
  genderTextWoman: {
    color: '#65e4d3',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  emptyCode: {
    marginBottom: 10,
    color: '#65e4d3',
    fontSize: 10,
    fontWeight: '800',
  },
  emptyTitle: {
    color: '#f1f5ee',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyDescription: {
    marginTop: 8,
    color: '#84928a',
    fontSize: 14,
    textAlign: 'center',
  },
  footerRail: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#26332f',
  },
  footerText: {
    color: '#71817a',
    fontSize: 8,
    fontWeight: '700',
  },
  footerAccent: {
    color: '#d7ff70',
  },
  feedback: {
    flex: 1,
  },
  feedbackText: {
    margin: 24,
    color: '#ff8b79',
    fontSize: 15,
    textAlign: 'center',
  },
});