type AgeData = { sd2neg: number; sd1neg: number; median: number; sd1: number; sd2: number }
type HeightData = { male: AgeData[]; female: AgeData[] }

export const heightStandardData: HeightData = {
  male: [
    { sd2neg: 46.1, sd1neg: 48.0, median: 49.9, sd1: 51.8, sd2: 53.7 },
    { sd2neg: 71.0, sd1neg: 73.4, median: 75.7, sd1: 78.1, sd2: 80.5 },
    { sd2neg: 81.7, sd1neg: 84.2, median: 86.8, sd1: 89.3, sd2: 91.9 },
    { sd2neg: 88.7, sd1neg: 91.5, median: 94.3, sd1: 97.1, sd2: 99.9 },
    { sd2neg: 94.4, sd1neg: 97.5, median: 100.6, sd1: 103.7, sd2: 106.8 },
    { sd2neg: 99.9, sd1neg: 103.1, median: 106.4, sd1: 109.7, sd2: 113.0 },
    { sd2neg: 105.0, sd1neg: 108.4, median: 111.9, sd1: 115.4, sd2: 118.9 },
    { sd2neg: 109.8, sd1neg: 113.4, median: 117.0, sd1: 120.6, sd2: 124.2 },
    { sd2neg: 114.3, sd1neg: 118.1, median: 121.9, sd1: 125.7, sd2: 129.5 },
    { sd2neg: 118.6, sd1neg: 122.6, median: 126.6, sd1: 130.6, sd2: 134.6 },
    { sd2neg: 122.8, sd1neg: 127.0, median: 131.2, sd1: 135.4, sd2: 139.6 },
    { sd2neg: 127.0, sd1neg: 131.5, median: 136.0, sd1: 140.5, sd2: 145.0 },
    { sd2neg: 131.5, sd1neg: 136.3, median: 141.1, sd1: 145.9, sd2: 150.7 },
    { sd2neg: 136.4, sd1neg: 141.5, median: 146.6, sd1: 151.7, sd2: 156.8 },
    { sd2neg: 141.6, sd1neg: 147.0, median: 152.4, sd1: 157.8, sd2: 163.2 },
    { sd2neg: 147.1, sd1neg: 152.6, median: 158.2, sd1: 163.8, sd2: 169.4 },
    { sd2neg: 152.5, sd1neg: 157.8, median: 163.2, sd1: 168.6, sd2: 174.0 },
    { sd2neg: 157.0, sd1neg: 162.0, median: 167.0, sd1: 172.0, sd2: 177.0 },
    { sd2neg: 159.4, sd1neg: 164.2, median: 169.0, sd1: 173.8, sd2: 178.6 }
  ],
  female: [
    { sd2neg: 45.4, sd1neg: 47.3, median: 49.1, sd1: 51.0, sd2: 52.9 },
    { sd2neg: 69.1, sd1neg: 71.5, median: 73.9, sd1: 76.3, sd2: 78.7 },
    { sd2neg: 79.6, sd1neg: 82.2, median: 84.8, sd1: 87.4, sd2: 90.0 },
    { sd2neg: 86.8, sd1neg: 89.6, median: 92.4, sd1: 95.2, sd2: 98.0 },
    { sd2neg: 92.6, sd1neg: 95.7, median: 98.8, sd1: 101.9, sd2: 105.0 },
    { sd2neg: 97.8, sd1neg: 101.1, median: 104.4, sd1: 107.7, sd2: 111.0 },
    { sd2neg: 102.7, sd1neg: 106.2, median: 109.7, sd1: 113.2, sd2: 116.7 },
    { sd2neg: 107.4, sd1neg: 111.1, median: 114.8, sd1: 118.5, sd2: 122.2 },
    { sd2neg: 111.9, sd1neg: 115.8, median: 119.7, sd1: 123.6, sd2: 127.5 },
    { sd2neg: 116.1, sd1neg: 120.2, median: 124.3, sd1: 128.4, sd2: 132.5 },
    { sd2neg: 120.1, sd1neg: 124.5, median: 128.9, sd1: 133.3, sd2: 137.7 },
    { sd2neg: 124.4, sd1neg: 129.0, median: 133.6, sd1: 138.2, sd2: 142.8 },
    { sd2neg: 129.2, sd1neg: 134.0, median: 138.8, sd1: 143.6, sd2: 148.4 },
    { sd2neg: 134.3, sd1neg: 139.5, median: 144.7, sd1: 149.9, sd2: 155.1 },
    { sd2neg: 139.5, sd1neg: 145.0, median: 150.5, sd1: 156.0, sd2: 161.5 },
    { sd2neg: 144.4, sd1neg: 149.8, median: 155.2, sd1: 160.6, sd2: 166.0 },
    { sd2neg: 148.0, sd1neg: 153.0, median: 158.0, sd1: 163.0, sd2: 168.0 },
    { sd2neg: 149.6, sd1neg: 154.4, median: 159.2, sd1: 164.0, sd2: 168.8 },
    { sd2neg: 150.2, sd1neg: 155.0, median: 159.8, sd1: 164.6, sd2: 169.4 }
  ]
}
