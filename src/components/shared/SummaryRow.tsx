import React from "react";
import { StyleSheet,View } from "react-native";
import { AppText } from "../ui";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/dimens";

interface SummaryRowProps {
    label: string;
    value: string;
}

export const SummaryRow = ({ label, value }: { label: string; value: string }) => {
    return (
      <View style={styles.summaryRow}>
        <AppText variant="body">{label}</AppText>
        <AppText variant="body" color={Colors.primary}>
          {value}
        </AppText>
      </View>
    );
  };

  const styles = StyleSheet.create({

  
 
  
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  
  