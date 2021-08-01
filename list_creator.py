from typing import List
import pandas as pd
import math

def create_final_stock_list(mega_df: pd.DataFrame, 
                            large_df: pd.DataFrame, 
                           mid_df: pd.DataFrame, 
                           small_df: pd.DataFrame, 
                           micro_df: pd.DataFrame, 
                           income: int, 
                           investment_amount: int, 
                           num_stocks: int):

    '''
    Functions that creates the final list of stock dicts to return to the front end, from the different size dfs
    Args:
        mega_df: DataFrame that holds the stocks whose mkt cap was > 200bn dollars
        large_df: DataFrame that holds the stocks whose mkt cap was in betweeen 10 and 200bn dollars
        mid_df: DataFrame that holds the stocks whose mkt cap was in betweeen 2 and 10bn dollars
        small_df: DataFrame that holds the stocks whose mkt cap was in betweeen 300 million and 2bn dollars
        micro_df: DataFrame that holds the stocks whose mkt cap was in betweeen 30 million and 300 million dollars
        income: int that represents the income amount of the user
        investment_amount: is the amount the user is willing to invest
        num_stocks: int representing the number of recommendations the user wants
    Returns:
        A list of json objects holding the metadata of the stock
    '''
    
    risk = conv_to_risk_tol(income=income, investment_amount=investment_amount)
    
    weights = cap_weights(riskTol=risk)
    
    ranges = create_indices(cap_weights=weights, num_stocks=num_stocks)
    
    mega_list = stock_list_from_df(df=mega_df, amount=ranges['mega_ix'], size_type='Mega')
    large_list = stock_list_from_df(df=large_df, amount=ranges['large_ix'], size_type='Large')
    mid_list = stock_list_from_df(df=mid_df, amount=ranges['mid_ix'], size_type='Mid')
    small_list = stock_list_from_df(df=small_df, amount=ranges['small_ix'], size_type='Small')
    micro_list = stock_list_from_df(df=micro_df, amount=ranges['micro_ix'], size_type='Micro')
    
    final_stock_list = mega_list + large_list + mid_list + small_list + micro_list
    
    print('Num stocks: {}'.format(len(final_stock_list)))
    
    return final_stock_list

def conv_to_risk_tol(income: int, investment_amount: int):
    '''
    Functions that creates a risk value between 0 and 1, which is a reflection of how much of the user's income
    they are willing to invest (higher ratio of investment_amount / income) means recommendations should be lower risk
    Args:
        income: int representing the income amount of the user
        investment_amount: int representing the amount the user wants to invest
    Returns:
        A float in betweeen 0 and 1, 0 represents no risk, 1 represents highest risk
    '''
    if investment_amount/income <= .5:
        return .5
    else:
        return 1 - (investment_amount/income)

def cap_weights(riskTol: float):
    '''
    Function that creates the percentage of stock recommendations that should be in each mkt cap range
    Args:
        riskTol: the float representing the risk that the recommendations should reflect
    Returns:
        List of percentages of how many recommendations should belong to each market cap range
    '''
    microRange = [0, .2]
    smallRange = [0, .2]
    midRange = [.2, .4]
    largeRange = [.6, .2]
    megaRange = [.2, 0]
    capRanges = [microRange, smallRange, midRange, largeRange, megaRange]
    ranges = []
    if riskTol == 0:
        return ranges
    else:
        for crange in capRanges:
            if crange[0] < crange[1]:
                ranges.append(round(crange[0] + ((crange[1] - crange[0]) * riskTol), 2))
            else:
                ranges.append(round(crange[0] - ((crange[0] - crange[1]) * riskTol), 2))
        return ranges 

#write a function to take in a diversity slider to set the constant number of stocks to take from each cap
def diversity_to_num_stocks(diversity):
    '''
    '''
    numStocks = [5, 25]
    return math.ceil(numStocks[0] + ((numStocks[1] - numStocks[0]) * diversity))

def create_indices(cap_weights: List[int], num_stocks:int):
    '''
    Function that creates the dict of the amount of stocks that should come from each mkt cap range
    Args: 
        cap_weights: list of floats representing the portion of stocks that should come from each mkt cap range
        num_stocks: int representing the number of stocks to be recommended
    Returns:
        Dict of amount of stocks to be included
    '''
    ranges = [int(num_stocks * weight) for weight in cap_weights]
    
    ranges[4] = num_stocks - sum(ranges[0:4])
    
    indices = {
        'mega_ix':None, 
        'large_ix':None, 
        'mid_ix': None, 
        'small_ix': None, 
        'micro_ix': None
    }
    
    
    for key, ran in zip(list(indices.keys()), ranges):
        indices[key] = ran
    
    return indices

def stock_list_from_df(df: pd.DataFrame, amount:int, size_type:str):
    '''
    Function that creates the list of stock metadata from a df of stocks within a mkt cap range
    Args:
        df: pandas DataFrame of finviz data
        amount: int representing the amount of stocks from this df that should be included in this list
        size_type: str representing the mkt cap range of this df
    Returns:
        A list of stock metadata, list of dicts
    '''
    subset_df = df[['Ticker', 'Company', 'Sector', 'Market Cap', 'Recom', 'Change_y']].sort_values(by='Recom', ascending=False)
    subset_df = subset_df.iloc[0:amount, :]
    stock_list = []
    for index, row in subset_df.iterrows():
        
        stock_dict = {
            'Name': row['Company'], 
            'Ticker': row['Ticker'], 
            'Sector': row['Sector'],
            'Size': size_type, 
            'Market_Cap': row['Market Cap'], 
            'DailyChange': row['Change_y'], 
            'AnalystRecommendation': row['Recom'], 
            'Link': 'https://finance.yahoo.com/quote/' + row['Ticker']
        }
        stock_list.append(stock_dict)
    
    return stock_list
