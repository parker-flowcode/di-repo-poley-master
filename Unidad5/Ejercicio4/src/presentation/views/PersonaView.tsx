import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { PersonaConColor } from '../models/DTO/PersonaConColor';
import { PersonaViewModel } from '../viewModels/PersonaViewModel';

const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

export default function PersonaView() {
  const { width } = useWindowDimensions();
  const compact = width < 430;
  const viewModel = useMemo(
    () => container.get<PersonaViewModel>(TYPES.PersonaViewModel),
    [],
  );
  const [persona, setPersona] = useState<PersonaConColor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const today = new Date();
  const dayIndex = today.getDay();
  const weekday = today.toLocaleDateString('es-ES', { weekday: 'long' });
  const fullDate = today.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    viewModel.cargarPersona();
    setPersona(viewModel.personaActual);
    setError(viewModel.error);
    setIsLoading(viewModel.isLoading);
  }, [viewModel]);

  const initials = persona
    ? `${persona.nombre.charAt(0)}${persona.apellidos.charAt(0)}`.toUpperCase()
    : '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.masthead}>
          <View style={styles.mastheadTop}>
            <View style={styles.brandLine}>
              <View style={styles.brandGlyph}><View style={styles.brandGlyphCore} /></View>
              <Text style={styles.brand}>SEMANA <Text style={styles.brandAccent}>/ 07</Text></Text>
            </View>
            <Text style={styles.liveLabel}>AGENDA VIVA</Text>
          </View>
          <View style={styles.mastheadBottom}>
            <Text style={styles.mastheadCaption}>UNA PERSONA, CADA DÍA</Text>
            <Text style={[styles.dayTitle, compact && styles.dayTitleCompact]}>
              {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
              <Text style={[styles.dayDot, persona && { color: persona.color }]}>.</Text>
            </Text>
            <Text style={styles.dateText}>{fullDate.toUpperCase()}</Text>
          </View>
          <View style={styles.weekStrip}>
            {weekDays.map((day, index) => (
              <View key={day} style={styles.weekCell}>
                <Text style={[styles.weekLetter, index === dayIndex && styles.weekLetterActive]}>{day}</Text>
                <View
                  style={[
                    styles.weekDot,
                    index === dayIndex && styles.weekDotActive,
                    index === dayIndex && persona && { backgroundColor: persona.color },
                  ]}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.sectionLabelRow}>
            <Text style={styles.sectionLabel}>PERSONA DEL DÍA</Text>
            <Text style={[styles.sequenceLabel, persona && { color: persona.color }]}>0{dayIndex + 1} <Text style={styles.sequenceDivider}>/ 07</Text></Text>
          </View>

          {isLoading ? (
            <ActivityIndicator style={styles.feedback} color="#df5d43" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : persona ? (
            <>
              <View style={[styles.identityRow, compact && styles.identityRowCompact]}>
                <View style={[styles.monogram, compact && styles.monogramCompact, { backgroundColor: persona.color }]}>
                  <Text style={[styles.monogramText, compact && styles.monogramTextCompact]}>{initials}</Text>
                  <View style={styles.monogramCorner} />
                </View>
                <View style={styles.nameBlock}>
                  <Text style={[styles.personName, compact && styles.personNameCompact]}>{persona.nombre}</Text>
                  <Text style={[styles.personSurname, compact && styles.personSurnameCompact]}>{persona.apellidos}</Text>
                </View>
              </View>

              <View style={styles.infoBand}>
                <View style={styles.infoCell}>
                  <Text style={styles.infoLabel}>IDENTIFICADOR</Text>
                  <Text style={styles.infoValue}>{persona.id}</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoCell}>
                  <Text style={styles.infoLabel}>FECHA DE NACIMIENTO</Text>
                  <Text style={styles.infoValue}>{persona.fechaNacimiento.toLocaleDateString('es-ES')}</Text>
                </View>
              </View>
              <View style={styles.noteLine}>
                <View style={styles.noteMark} />
                <Text style={styles.noteText}>SELECCIÓN AUTOMÁTICA SEGÚN EL DÍA DE LA SEMANA</Text>
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerWord}>PERSONA <Text style={styles.footerAccent}>/</Text> {String(dayIndex + 1).padStart(2, '0')}</Text>
          <Text style={styles.footerCaption}>DOMINGO → SÁBADO</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f4ef',
  },
  scrollContent: {
    flexGrow: 1,
  },
  masthead: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 21,
    backgroundColor: '#123d34',
  },
  mastheadTop: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#3b5f55',
  },
  brandLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandGlyph: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    borderWidth: 1,
    borderColor: '#d8ff6a',
    transform: [{ rotate: '45deg' }],
  },
  brandGlyphCore: {
    width: 5,
    height: 5,
    backgroundColor: '#d8ff6a',
  },
  brand: {
    color: '#f5f4e9',
    fontSize: 11,
    fontWeight: '800',
  },
  brandAccent: {
    color: '#d8ff6a',
  },
  liveLabel: {
    color: '#b7c8bd',
    fontSize: 9,
    fontWeight: '700',
  },
  mastheadBottom: {
    paddingTop: 27,
    paddingBottom: 23,
  },
  mastheadCaption: {
    color: '#b7c8bd',
    fontSize: 10,
    fontWeight: '700',
  },
  dayTitle: {
    marginTop: 5,
    color: '#f5f4e9',
    fontFamily: 'Georgia',
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 64,
  },
  dayTitleCompact: {
    fontSize: 48,
    lineHeight: 56,
  },
  dayDot: {
    color: '#d8ff6a',
  },
  dateText: {
    marginTop: 5,
    color: '#d8ff6a',
    fontSize: 10,
    fontWeight: '700',
  },
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#3b5f55',
  },
  weekCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekLetter: {
    color: '#95ada1',
    fontSize: 10,
    fontWeight: '700',
  },
  weekLetterActive: {
    color: '#d8ff6a',
  },
  weekDot: {
    width: 5,
    height: 5,
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  weekDotActive: {
    backgroundColor: '#d8ff6a',
    transform: [{ rotate: '45deg' }],
  },
  profileSection: {
    flex: 1,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d2dbd2',
  },
  sectionLabel: {
    color: '#496258',
    fontSize: 10,
    fontWeight: '800',
  },
  sequenceLabel: {
    color: '#df5d43',
    fontSize: 11,
    fontWeight: '800',
  },
  sequenceDivider: {
    color: '#89968d',
  },
  identityRow: {
    minHeight: 210,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 28,
  },
  identityRowCompact: {
    minHeight: 170,
    paddingVertical: 22,
  },
  monogram: {
    width: 116,
    height: 116,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 23,
    backgroundColor: '#d8ff6a',
  },
  monogramCompact: {
    width: 84,
    height: 84,
    marginRight: 17,
  },
  monogramText: {
    color: '#123d34',
    fontFamily: 'Georgia',
    fontSize: 43,
    fontWeight: '700',
  },
  monogramTextCompact: {
    fontSize: 34,
  },
  monogramCorner: {
    position: 'absolute',
    right: 7,
    bottom: 7,
    width: 8,
    height: 8,
    backgroundColor: '#df5d43',
  },
  nameBlock: {
    flex: 1,
    minWidth: 0,
  },
  personName: {
    color: '#193c33',
    fontFamily: 'Georgia',
    fontSize: 39,
    fontWeight: '700',
  },
  personNameCompact: {
    fontSize: 31,
  },
  personSurname: {
    marginTop: 2,
    color: '#193c33',
    fontFamily: 'Georgia',
    fontSize: 31,
  },
  personSurnameCompact: {
    fontSize: 25,
  },
  infoBand: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d2dbd2',
  },
  infoCell: {
    flex: 1,
  },
  infoDivider: {
    width: 1,
    marginHorizontal: 16,
    backgroundColor: '#d2dbd2',
  },
  infoLabel: {
    color: '#74837a',
    fontSize: 9,
    fontWeight: '800',
  },
  infoValue: {
    marginTop: 7,
    color: '#193c33',
    fontSize: 15,
    fontWeight: '700',
  },
  noteLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  noteMark: {
    width: 6,
    height: 6,
    marginRight: 8,
    backgroundColor: '#df5d43',
  },
  noteText: {
    flex: 1,
    color: '#74837a',
    fontSize: 9,
    fontWeight: '700',
  },
  feedback: {
    marginVertical: 80,
  },
  errorText: {
    marginVertical: 50,
    color: '#a43d2d',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 26,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#d2dbd2',
  },
  footerWord: {
    color: '#193c33',
    fontSize: 10,
    fontWeight: '800',
  },
  footerAccent: {
    color: '#df5d43',
  },
  footerCaption: {
    color: '#74837a',
    fontSize: 9,
    fontWeight: '700',
  },
});