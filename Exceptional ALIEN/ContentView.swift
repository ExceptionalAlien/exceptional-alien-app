//
//  ContentView.swift
//  Exceptional ALIEN
//
//  Created by Adam Johnson on 25/1/2024.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            GeometryReader { geometry in
                ZStack(alignment: .top) {
                    MapView()
                    
                    // Nav bg
                    Rectangle()
                        .fill(.ultraThinMaterial)
                        .frame(height: geometry.safeAreaInsets.top)
                        .ignoresSafeArea()
                }
                .toolbar {
                    ToolbarItem(placement: .topBarLeading) {
                        HomeTitle()
                    }
                    
                    ToolbarItemGroup(placement: .primaryAction) {
                        NavigationLink {
                            Search()
                        } label: {
                            Image(systemName: "magnifyingglass")
                                .resizable()
                                .frame(width: 24, height: 24)
                        }
                        
                        NavigationLink {
                            Profile()
                        } label: {
                            Image("icon-person")
                                .resizable()
                                .frame(width: 24, height: 24)
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
