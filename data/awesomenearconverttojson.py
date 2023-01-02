import json,codecs,ast
from pandas import DataFrame as df
import pandas as pd
import sys
import re
import numpy as np

def wallet_sorting(x):
    if x:
        arr = x.split(',')
        arr = sorted(arr, key=str.lower)
        return ','.join(arr)
    return x

def remove_empty_split(x):    
    if x:        
        if len(x) == 1 and x == "|":
            return ""
    return x

dataframe1 = pd.read_csv('123.csv')
dataframe2 = pd.read_csv('456.csv')


concatenated_df = pd.concat([dataframe1,dataframe2],ignore_index = True)
concatenated_df = concatenated_df.replace({np.nan:None})

# extract WalletSelector and clean it
wallet_selector = pd.read_excel('NEAR dApp.xlsx')
wallet_selector.fillna('',inplace=True)
wallet_selector['Wallets Integrated'] =  wallet_selector['Wallets Integrated'].apply(wallet_sorting)
wallet_selector['WalletSelector_Comments1'] = wallet_selector['ProjectName'] + '|' + wallet_selector['Any NEAR Integration'] + '|' + wallet_selector['WS Integration'] + '|' + wallet_selector['Wallets Integrated'] + '|' + wallet_selector['Coding Shot Notes']
#wallet_selector['WalletSelector_Comments1'] = wallet_selector['ProjectName'] + '|' + wallet_selector['Any NEAR Integration'] + '|' + wallet_selector['WS Integration'] + '|' + wallet_selector['Wallets Integrated']
wallet_selector['WalletSelector_Comments2'] = wallet_selector['PoC'] +  '|' + wallet_selector['Contract Address']
#wallet_selector_final = wallet_selector[['WalletSelector_Comments1','WalletSelector_Comments2','ProjectName','Any NEAR Integration','WS Integration','Wallets Integrated','Coding Shot Notes','PoC','Contract Address']]
wallet_selector['WalletSelector_Comments1'] =  wallet_selector['WalletSelector_Comments1'].apply(remove_empty_split)
wallet_selector['WalletSelector_Comments2'] =  wallet_selector['WalletSelector_Comments2'].apply(remove_empty_split)
wallet_selector_final = wallet_selector[['WalletSelector_Comments1','WalletSelector_Comments2','ProjectName']]
wallet_selector_final = wallet_selector_final.replace({np.nan:None})

#join NearProjects and walletselector
result = pd.merge(concatenated_df,wallet_selector_final,how = 'left',on = 'ProjectName')
result["Notes"] = None
result["Date_Created"] = None

result = result.replace({np.nan:None})
result.to_csv('combineddata.csv',index = False)  

with open('combineddata.json', 'w') as f:
    json.dump(result.to_dict('records'),f)


