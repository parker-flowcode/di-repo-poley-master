import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { PersonaUIModel } from '../models/PersonaUIModel';
import { PersonListViewModel } from '../viewModels/PersonListViewModel';

export default function PeopleListScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 560;
  const viewModel = useMemo(
    () => container.get<PersonListViewModel>(TYPES.PersonListViewModel),
    [],
  );
  const [personas, setPersonas] = useState<PersonaUIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void viewModel.cargarPersonas().then(() => {
      if (!active) return;
      setPersonas(viewModel.personas);
      setError(viewModel.error);
      setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [viewModel]);

  const departamentos = Array.from(
    new Map(personas.map((persona) => [persona.departamentoNombre, persona.departamentoColor])),
  );

  const renderPersona = ({ item, index }: { item: PersonaUIModel; index: number }) => (
    <View
      style={[
        styles.personRow,
        compact && styles.personRowCompact,
        { backgroundColor: item.departamentoColor },
      ]}
    >
      <Text style={styles.rowNumber}>{String(index + 1).padStart(2, '0')}</Text>
      <View style={[styles.personDetails, compact && styles.personDetailsCompact]}>
        <Text style={[styles.personName, compact && styles.personNameCompact]} numberOfLines={1}>
          {item.nombreCompleto}
        </Text>
        <View style={[styles.departmentCell, compact && styles.departmentCellCompact]}>
          <View style={[styles.departmentDot, { backgroundColor: '#36443F' }]} />
          <Text style={styles.departmentName}>{item.departamentoNombre}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.topbar}>
          <View style={styles.brandMark}><View style={styles.brandMarkInner} /></View>
          <Text style={styles.brand}>DIRECTORIO <Text style={styles.brandMuted}>/ EQUIPOS</Text></Text>
          <Text style={styles.topbarMeta}>UNIDAD 5 · MVVM</Text>
        </View>

        <View style={[styles.intro, compact && styles.introCompact]}>
          <View style={styles.introCopy}>
            <Text style={styles.kicker}>PERSONAS Y DEPARTAMENTOS</Text>
            <Text style={styles.title}>Un equipo, muchas áreas.</Text>
            <Text style={styles.subtitle}>Cada persona, junto a su departamento.</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalValue}>{String(personas.length).padStart(2, '0')}</Text>
            <Text style={styles.totalLabel}>PERSONAS</Text>
          </View>
        </View>

        <View style={styles.departmentLegend}>
          {departamentos.map(([nombre, color]) => (
            <View key={nombre} style={styles.legendItem}>
              <View style={[styles.legendSwatch, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{nombre}</Text>
            </View>
          ))}
        </View>

        {!compact && (
          <View style={styles.listHeader}>
            <Text style={[styles.columnLabel, styles.nameColumn]}>NOMBRE Y APELLIDOS</Text>
            <Text style={[styles.columnLabel, styles.departmentColumn]}>DEPARTAMENTO</Text>
          </View>
        )}

        {isLoading ? (
          <ActivityIndicator style={styles.feedback} color="#287D70" />
        ) : error ? (
          <Text style={styles.feedbackText}>{error}</Text>
        ) : (
          <FlatList
            data={personas}
            keyExtractor={(item) => item.id}
            renderItem={renderPersona}
            contentContainerStyle={personas.length ? styles.list : styles.emptyList}
            ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
            ListEmptyComponent={(
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No hay personas para mostrar</Text>
                <Text style={styles.emptyDescription}>El repositorio todavía no contiene registros.</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>DATOS DE EJEMPLO</Text>
          <Text style={styles.footerText}>{departamentos.length} DEPARTAMENTOS</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F6F2' },
  page: { flex: 1, width: '100%', maxWidth: 980, alignSelf: 'center', paddingHorizontal: 28 },
  topbar: { height: 66, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DDE2DC' },
  brandMark: { width: 25, height: 25, borderRadius: 7, backgroundColor: '#287D70', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  brandMarkInner: { width: 9, height: 9, borderRadius: 3, backgroundColor: '#F5F6F2' },
  brand: { fontSize: 12, fontWeight: '800', letterSpacing: 0.6, color: '#25342F' },
  brandMuted: { color: '#7A8981', fontWeight: '500' },
  topbarMeta: { marginLeft: 'auto', color: '#78857E', fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  intro: { minHeight: 178, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 28, borderBottomWidth: 1, borderBottomColor: '#DDE2DC' },
  introCompact: { minHeight: 156, paddingVertical: 22 },
  introCopy: { flex: 1, paddingRight: 14 },
  kicker: { color: '#287D70', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { marginTop: 9, color: '#26352F', fontFamily: 'Georgia', fontSize: 32, lineHeight: 39 },
  subtitle: { marginTop: 8, color: '#6E7D74', fontSize: 13 },
  total: { minWidth: 78, paddingLeft: 18, borderLeftWidth: 1, borderLeftColor: '#DDE2DC', alignItems: 'flex-end' },
  totalValue: { color: '#26352F', fontSize: 30, fontWeight: '700', fontVariant: ['tabular-nums'] },
  totalLabel: { marginTop: 2, color: '#78857E', fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  departmentLegend: { minHeight: 60, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 20, rowGap: 9, borderBottomWidth: 1, borderBottomColor: '#DDE2DC' },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendSwatch: { width: 12, height: 12, borderWidth: 1, borderColor: '#CCD4CC', borderRadius: 3, marginRight: 7 },
  legendText: { color: '#536159', fontSize: 11, fontWeight: '600' },
  listHeader: { height: 47, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  columnLabel: { color: '#7B8981', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  nameColumn: { flex: 1.6, paddingLeft: 35 },
  departmentColumn: { flex: 1 },
  list: { paddingBottom: 8 },
  emptyList: { flexGrow: 1 },
  personRow: { minHeight: 58, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, borderRadius: 5 },
  personRowCompact: { minHeight: 61, paddingHorizontal: 10 },
  rowNumber: { width: 35, color: '#7A8981', fontSize: 10, fontWeight: '700', fontVariant: ['tabular-nums'] },
  personDetails: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  personDetailsCompact: { flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center' },
  personName: { flex: 1.6, paddingRight: 10, color: '#26352F', fontSize: 13, fontWeight: '700' },
  personNameCompact: { flex: 0, paddingRight: 0 },
  departmentCell: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  departmentCellCompact: { flex: 0, marginTop: 4 },
  departmentDot: { width: 6, height: 6, borderRadius: 3, marginRight: 8 },
  departmentName: { flex: 1, color: '#46564D', fontSize: 12 },
  rowSeparator: { height: 5 },
  feedback: { flex: 1 },
  feedbackText: { padding: 24, color: '#8E443B', fontSize: 14 },
  emptyState: { flex: 1, minHeight: 180, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { color: '#26352F', fontSize: 15, fontWeight: '700' },
  emptyDescription: { marginTop: 7, color: '#78857E', fontSize: 12 },
  footer: { height: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#DDE2DC' },
  footerText: { color: '#89958E', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
});