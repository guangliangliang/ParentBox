type AgeData = { sd2neg: number; sd1neg: number; median: number; sd1: number; sd2: number }
type WeightData = { male: AgeData[]; female: AgeData[] }

export const weightStandardData: WeightData = {
  male: [
    { sd2neg: 2.5, sd1neg: 2.9, median: 3.3, sd1: 3.7, sd2: 4.1 },
    { sd2neg: 7.0, sd1neg: 7.8, median: 8.6, sd1: 9.4, sd2: 10.2 },
    { sd2neg: 8.8, sd1neg: 9.8, median: 10.8, sd1: 11.8, sd2: 12.8 },
    { sd2neg: 10.0, sd1neg: 11.1, median: 12.2, sd1: 13.4, sd2: 14.6 },
    { sd2neg: 10.9, sd1neg: 12.2, median: 13.5, sd1: 14.8, sd2: 16.1 },
    { sd2neg: 11.8, sd1neg: 13.2, median: 14.6, sd1: 16.0, sd2: 17.4 },
    { sd2neg: 12.6, sd1neg: 14.1, median: 15.6, sd1: 17.2, sd2: 18.8 },
    { sd2neg: 13.3, sd1neg: 14.9, median: 16.6, sd1: 18.3, sd2: 20.0 },
    { sd2neg: 14.0, sd1neg: 15.7, median: 17.5, sd1: 19.3, sd2: 21.2 },
    { sd2neg: 14.6, sd1neg: 16.4, median: 18.3, sd1: 20.3, sd2: 22.3 },
    { sd2neg: 15.2, sd1neg: 17.1, median: 19.1, sd1: 21.2, sd2: 23.3 },
    { sd2neg: 15.8, sd1neg: 17.8, median: 19.9, sd1: 22.1, sd2: 24.4 },
    { sd2neg: 16.4, sd1neg: 18.6, median: 20.9, sd1: 23.3, sd2: 25.8 },
    { sd2neg: 17.2, sd1neg: 19.6, median: 22.0, sd1: 24.6, sd2: 27.3 },
    { sd2neg: 18.1, sd1neg: 20.7, median: 23.4, sd1: 26.2, sd2: 29.2 },
    { sd2neg: 19.1, sd1neg: 21.9, median: 24.9, sd1: 28.0, sd2: 31.3 },
    { sd2neg: 20.2, sd1neg: 23.2, median: 26.5, sd1: 30.0, sd2: 33.7 },
    { sd2neg: 21.4, sd1neg: 24.6, median: 28.2, sd1: 32.1, sd2: 36.2 },
    { sd2neg: 22.6, sd1neg: 26.0, median: 30.0, sd1: 34.4, sd2: 39.0 }
  ],
  female: [
    { sd2neg: 2.4, sd1neg: 2.8, median: 3.2, sd1: 3.6, sd2: 4.0 },
    { sd2neg: 6.4, sd1neg: 7.2, median: 8.0, sd1: 8.8, sd2: 9.6 },
    { sd2neg: 8.1, sd1neg: 9.1, median: 10.1, sd1: 11.1, sd2: 12.1 },
    { sd2neg: 9.3, sd1neg: 10.4, median: 11.5, sd1: 12.7, sd2: 13.9 },
    { sd2neg: 10.1, sd1neg: 11.3, median: 12.6, sd1: 13.9, sd2: 15.2 },
    { sd2neg: 10.8, sd1neg: 12.2, median: 13.6, sd1: 15.0, sd2: 16.5 },
    { sd2neg: 11.5, sd1neg: 13.0, median: 14.5, sd1: 16.1, sd2: 17.7 },
    { sd2neg: 12.2, sd1neg: 13.7, median: 15.4, sd1: 17.1, sd2: 18.9 },
    { sd2neg: 12.8, sd1neg: 14.5, median: 16.2, sd1: 18.0, sd2: 19.9 },
    { sd2neg: 13.4, sd1neg: 15.1, median: 17.0, sd1: 18.9, sd2: 20.9 },
    { sd2neg: 14.0, sd1neg: 15.8, median: 17.7, sd1: 19.7, sd2: 21.8 },
    { sd2neg: 14.6, sd1neg: 16.5, median: 18.5, sd1: 20.6, sd2: 22.8 },
    { sd2neg: 15.3, sd1neg: 17.3, median: 19.4, sd1: 21.6, sd2: 24.0 },
    { sd2neg: 16.1, sd1neg: 18.2, median: 20.4, sd1: 22.8, sd2: 25.4 },
    { sd2neg: 17.0, sd1neg: 19.3, median: 21.6, sd1: 24.2, sd2: 27.0 },
    { sd2neg: 18.0, sd1neg: 20.5, median: 23.0, sd1: 25.8, sd2: 28.8 },
    { sd2neg: 19.0, sd1neg: 21.7, median: 24.5, sd1: 27.6, sd2: 30.9 },
    { sd2neg: 20.0, sd1neg: 22.9, median: 26.0, sd1: 29.4, sd2: 33.1 },
    { sd2neg: 21.0, sd1neg: 24.1, median: 27.5, sd1: 31.2, sd2: 35.2 }
  ]
}
